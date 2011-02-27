class RenameWebsiteMainContentArea < ActiveRecord::Migration
  def self.up
    rename_column :websites, :main_content_area, :content
  end

  def self.down
    rename_column :websites, :content, :main_content_area
  end
end
