class CreateWebsites < ActiveRecord::Migration
  def self.up
    create_table :websites do |t|
      t.integer :user_id
      t.text    :main_content_area

      t.timestamp
    end

    add_index :websites, :user_id
  end

  def self.down
    drop_table :websites
  end
end
