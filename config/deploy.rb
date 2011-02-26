require 'bundler/capistrano'

default_run_options[:pty] = true
ssh_options[:forward_agent] = true

set :application, 'precis-beta'
set :deploy_to, "/home/beta/#{application}"
set :deploy_via, :remote_cache

set :repository,  'git@github.com:/kristinh/precis.git'
set :branch, 'master'
set :scm, :git

role :web, "beta.precis-project.com"
role :app, "beta.precis-project.com"
role :db,  "beta.precis-project.com", :primary => true

set :user, 'beta'
set :use_sudo, false

namespace :deploy do
  task :start do
    sudo "sv start #{application} || true"
  end

  task :stop do
    sudo "sv stop #{application} || true"
  end

  task :restart do
    sudo "sv restart #{application} || true"
  end
end

task :symlink_configuration do
  run "[ -e #{release_path}/config/database.yml ] && rm -f #{release_path}/config/database.yml ; true"
  run "ln -s #{shared_path}/config/database.yml #{release_path}/config/database.yml"
end

after 'deploy:update_code', :symlink_configuration
