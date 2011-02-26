class Restaurant < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :name, :opening_hours
end
