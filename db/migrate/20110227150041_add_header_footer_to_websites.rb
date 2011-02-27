class AddHeaderFooterToWebsites < ActiveRecord::Migration
  def self.up
    add_column :websites, :header, :text
    add_column :websites, :footer, :text
  end

  def self.down
    remove_column :websites, :header
    remove_column :websites, :footer
  end
end
