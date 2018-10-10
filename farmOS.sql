DROP TABLE IF EXISTS livestock;
DROP TABLE IF EXISTS livestock_type;
DROP TABLE IF EXISTS livestock_category;
DROP TABLE IF EXISTS livestock_production;
DROP TABLE IF EXISTS livestock_products;
DROP TABLE IF EXISTS product_cost;

CREATE TABLE livestock_type (UUID TEXT NOT NULL, NAME TEXT NOT NULL);
CREATE TABLE livestock_category (UUID TEXT NOT NULL, NAME TEXT NOT NULL, livestock_type_uuid TEXT NOT NULL,
FOREIGN KEY (livestock_type_uuid) REFERENCES livestock_type(uuid));

CREATE TABLE livestock_products (UUID TEXT NOT NULL, NAME TEXT NOT NULL, livestock_category_rowid INTEGER NOT NULL,
FOREIGN KEY (livestock_category_rowid) REFERENCES livestock_category(rowid));

CREATE TABLE product_cost (UUID TEXT NOT NULL, UNIT_PRICE REAL NOT NULL, livestock_products_rowid INTEGER NOT NULL,
FOREIGN KEY (livestock_products_rowid) REFERENCES livestock_products(rowid));

CREATE TABLE livestock (UUID TEXT NOT NULL, NAME TEXT NULL, livestock_type_rowid INTEGER NOT NULL, livestock_category_rowid INTEGER NOT NULL,
FOREIGN KEY (livestock_category_rowid) REFERENCES livestock_category(rowid));

CREATE TABLE livestock_production(UUID TEXT NOT NULL, QUANTITY REAL NOT NULL, YEAR INTEGER NOT NULL, MONTH INTEGER NOT NULL, DAY INTEGER NOT NULL,
product_cost_rowid INTEGER NOT NULL, livestock_category_rowid INTEGER NOT NULL,
FOREIGN KEY (product_cost_rowid) REFERENCES product_cost(rowid), FOREIGN KEY (livestock_category_rowid) REFERENCES livestock_category(rowid));