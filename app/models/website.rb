require 'ostruct'

class Website < ActiveRecord::Base
  attr_accessor :restaurant

  belongs_to :user

  before_create :set_defaults

  def template
    @template ||= OpenStruct.new({
      :name        => 'prototype',
      :structure   => 'structure.html.liquid',
      :header      => 'header.html.liquid',
      :content     => 'content.html.liquid',
      :footer      => 'footer.html.liquid',
    })
  end

  def name
    "blah"
  end

  private

  def set_defaults
    self.header  = default_header
    self.content = default_content
    self.footer  = default_footer
  end

  def template_file(key)
    File.join(
      Rails.root, 'app', 'views', 'templates', template.name, template.send(key)
    )
  end

  def liquid_template(key)
    Liquid::Template.parse(File.read(template_file(key)))
  end

  def default_header
    liquid_template(:header).render({ 'name' => restaurant.name })
  end

  def default_content
    liquid_template(:content).render({
      'email_address'  => user.email,
      'opening_hours'  => restaurant.opening_hours,
      'phone_number'   => restaurant.phone_number,
      'street_address' => restaurant.street_address,
    })
  end

  def default_footer
    liquid_template(:footer).render({})
  end
end
