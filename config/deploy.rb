# frozen_string_literal: true

set :stages, %w[production]
set :default_stage, 'production'

require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
require 'mina/rbenv'
require 'mina/puma'
require 'mina/clockwork'
require 'mina/logs'
require 'mina/multistage'

# Shared dirs and files will be symlinked into the app-folder by the 'deploy:link_shared_paths' step.
# Some plugins already add folders to shared_dirs like `mina/rails` add `public/assets`, `vendor/bundle` and many more
# run `mina -d` to see all folders and files already included in `shared_dirs` and `shared_files`
# set :shared_dirs, fetch(:shared_dirs, []).push('public/assets')
# set :shared_files, fetch(:shared_files, []).push('config/database.yml', 'config/secrets.yml')

set :shared_dirs, fetch(:shared_dirs, []).push('log', 'public/uploads', 'node_modules', 'storage')
set :shared_files, fetch(:shared_files, []).push('config/database.yml')
set :shared_files, fetch(:shared_files, []).push('config/application.yml')
set :shared_files, fetch(:shared_files, []).push('config/master.key')

set :puma_config, -> { "#{fetch(:current_path)}/config/puma.rb" }
set :clockwork_file, -> { "#{fetch(:current_path)}/config/clock.rb" }
set :tmp_path, -> { "#{fetch(:deploy_to)}/tmp" }

# This task is the environment that is loaded for all remote run commands, such as
# `mina deploy` or `mina rake`.
task :remote_environment do
  # If you're using rbenv, use this to load the rbenv environment.
  # Be sure to commit your .ruby-version or .rbenv-version to your repository.
  invoke :'rbenv:load'

  # For those using RVM, use this to load an RVM version@gemset.
  # invoke :'rvm:use', 'ruby-1.9.3-p125@default'
end

# Put any custom commands you need to run at setup
# All paths in `shared_dirs` and `shared_paths` will be created on their own.
task :setup do
  # command %{rbenv install 2.3.0 --skip-existing}

  command %(mkdir -p "#{fetch(:shared_path)}/tmp/sockets")
  command %(chmod g+rx,u+rwx "#{fetch(:shared_path)}/tmp/sockets")

  command %(mkdir -p "#{fetch(:shared_path)}/tmp/pids")
  command %(chmod g+rx,u+rwx "#{fetch(:shared_path)}/tmp/pids")

  command %(mkdir -p "#{fetch(:shared_path)}/log")
  command %(chmod g+rx,u+rwx "#{fetch(:shared_path)}/log")

  command %(mkdir -p "#{fetch(:shared_path)}/public/uploads")
  command %(chmod g+rx,u+rwx "#{fetch(:shared_path)}/public/uploads")

  command %(mkdir -p "#{fetch(:shared_path)}/node_modules")
  command %(chmod g+rx,u+rwx "#{fetch(:shared_path)}/node_modules")

  command %(mkdir -p "#{fetch(:shared_path)}/storage")
  command %(chmod g+rx,u+rwx "#{fetch(:shared_path)}/storage")

  command %(mkdir -p "#{fetch(:shared_path)}/config")
  command %(chmod g+rx,u+rwx "#{fetch(:shared_path)}/config")

  command %(touch "#{fetch(:shared_path)}/config/database.yml")
  command %(echo "-----> Be sure to edit '#{fetch(:shared_path)}/config/database.yml'")

  command %(touch "#{fetch(:shared_path)}/config/application.yml")
  command %(echo "-----> Be sure to edit '#{fetch(:shared_path)}/config/application.yml'")

  command %(touch "#{fetch(:shared_path)}/config/master.key")
  command %(echo "-----> Be sure to edit '#{fetch(:shared_path)}/config/master.key'")
end

desc 'restart mixin blaze'
task :mixin_blaze_restart do
  in_path(fetch(:current_path)) do
    command %(RAILS_ENV=production bundle exec bin/mixin_daemon restart)
  end
end

desc 'Reload Sidekiq'
task :sidekiq_reload do
  command %(echo "-----> exec: sudo systemctl reload sidekiq")
  command %(sudo systemctl reload sidekiq)
end

desc 'Restart Sidekiq'
task :sidekiq_restart do
  command %(echo "-----> exec: sudo systemctl restart sidekiq")
  command %(sudo systemctl restart sidekiq)
end

desc 'Stop Sidekiq'
task :sidekiq_stop do
  command %(echo "-----> exec: sudo systemctl stop sidekiq")
  command %(sudo systemctl stop sidekiq)
end

desc 'Tail sidekiq log'
task :sidekiq_log do
  command %(echo "-----> exec: journalctl -f -u sidekiq")
  command %(journalctl -f -u sidekiq)
end

desc 'Rsync precompiled assets from local to remote /temp'
task :rsync_packs_from_local_to_tmp do
  run :local do
    command %(echo "-----> rsync public/assets to #{fetch(:tmp_path)}/public/assets")
    command %(rsync -avzh public/assets/ #{fetch(:user)}@#{fetch(:domain)}:#{fetch(:tmp_path)}/public/assets/)

    command %(echo "-----> rsync public/packs to #{fetch(:tmp_path)}/public/packs")
    command %(rsync -avzh public/packs/ #{fetch(:user)}@#{fetch(:domain)}:#{fetch(:tmp_path)}/public/packs/)
  end
end

desc 'Rsync packs from /tmp to /current'
task :rsync_from_tmp_to_current do
  command %(echo "-----> rsync #{fetch(:tmp_path)}/public/assets/ to #{fetch(:current_path)}/public/assets")
  command %(rsync #{fetch(:tmp_path)}/public/assets/ #{fetch(:current_path)}/public/assets/)

  command %(echo "-----> rsync #{fetch(:tmp_path)}/public/packs/ to #{fetch(:current_path)}/public/assets")
  command %(rsync #{fetch(:tmp_path)}/public/packs/ #{fetch(:current_path)}/public/packs/)
end

desc 'Deploys the current version to the server.'
task :deploy do
  # uncomment this line to make sure you pushed your local branch to the remote origin
  # invoke :'git:ensure_pushed'

  invoke :rsync_packs_from_local_to_tmp

  deploy do
    # Put things that will set up an empty directory into a fully set-up
    # instance of your project.
    invoke :sidekiq_reload
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:db_migrate'
    # invoke :'rails:assets_precompile'
    invoke :'deploy:cleanup'

    on :launch do
      invoke :rsync_from_tmp_to_current
      invoke :'rbenv:load'
      invoke :'puma:smart_restart'
      invoke :sidekiq_restart
      invoke :'clockwork:restart'
      invoke :mixin_blaze_restart
    end
  end

  # you can use `run :local` to run tasks on local machine before of after the deploy scripts
  # run(:local){ say 'done' }
end

desc 'Prepare the first deploy on server.'
task :first_deploy do
  command %(echo "-----> Server: #{fetch(:domain)}")
  command %(echo "-----> Path: #{fetch(:deploy_to)}")
  command %(echo "-----> Branch: #{fetch(:branch)}")

  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:assets_precompile'
    invoke :'deploy:cleanup'

    on :launch do
      invoke :'rbenv:load'
      invoke :'rails:db_create'
      invoke :'rails:db_migrate'
    end
  end
end

# For help in making your deploy script, see the Mina documentation:
#
#  - https://github.com/mina-deploy/mina/tree/master/docs
