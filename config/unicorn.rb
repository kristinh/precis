# Minimal sample configuration file for Unicorn (not Rack) when used
# with daemonization (unicorn -D) started in your working directory.
#
# See http://unicorn.bogomips.org/Unicorn/Configurator.html for complete
# documentation.
# See also http://unicorn.bogomips.org/examples/unicorn.conf.rb for
# a more verbose configuration using more features.

shared_path = File.expand_path('../../../../shared', __FILE__)

listen File.join(shared_path, 'unicorn.sock'), :backlog => 64
pid    File.join(shared_path, 'pids', 'unicorn.pid')

worker_processes 2 # this should be >= nr_cpus
