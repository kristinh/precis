class CreateRestaurants < ActiveRecord::Migration
  def self.up
    create_table :restaurants do |t|
      t.integer :user_id
      t.string  :name
      t.text    :opening_hours
      t.text    :street_address
      t.text    :phone_number

      t.timestamps
    end

    add_index :restaurants, :user_id
  end

  def self.down
    drop_table :restaurants
  end
end
