class User < ActiveRecord::Base
  attr_accessor :name, :opening_hours, :street_address, :phone_number

  has_one :restaurant
  has_one :website

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible(
    :email,
    :password,
    :password_confirmation,
    :remember_me,
    :first_name,
    :last_name,
    :name,
    :opening_hours,
    :street_address,
    :phone_number,
  )

  validates_presence_of :first_name, :last_name

  after_create :build_restaurant, :build_website

  private

  def build_restaurant
    create_restaurant({
      :name           => name,
      :opening_hours  => opening_hours,
      :street_address => street_address,
      :phone_number   => phone_number,
    })
  end

  def build_website
    create_website({ :restaurant => restaurant })
  end
end
