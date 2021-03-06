BEGIN;

	DROP TABLE IF EXISTS course , category , comment , favorite, users, user_favorite_folders
	CASCADE;

CREATE TABLE users
(
	id SERIAL PRIMARY KEY ,
	name VARCHAR(255) NOT NULL,
	picture TEXT,
	email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE category
(
	id SERIAL PRIMARY KEY ,
	name VARCHAR(255) NOT NULL
);

CREATE TABLE course
(
	id SERIAL PRIMARY KEY,
	category_id INTEGER NOT NULL REFERENCES category(id),
	title VARCHAR(255) NOT NULL,
	image VARCHAR(255) NOT NULL DEFAULT 'https://uniweb.qwebbuilder.com.ng/images/onlinecourses.jpg' ,
	author_name VARCHAR(255) NOT NULL DEFAULT 'no author',
	url VARCHAR(255) NOT NULL UNIQUE,
	rate VARCHAR(255) NOT NULL DEFAULT 'no rate',
	reviews VARCHAR(255) NOT NULL DEFAULT 'no reviews',
	description TEXT NOT NULL,
	source VARCHAR(255) NOT NULL
);

CREATE TABLE comment
(
	id SERIAL PRIMARY KEY ,
	content VARCHAR(255) NOT NULL,
	user_id INTEGER NOT NULL REFERENCES users(id),
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	course_id INTEGER NOT NULL REFERENCES course(id)
);

CREATE TABLE user_favorite_folders
(
	id SERIAL PRIMARY KEY ,
	title VARCHAR(255) NOT NULL,
	user_id INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE favorite
(
	user_id INTEGER NOT NULL REFERENCES users(id),
	course_id INTEGER NOT NULL REFERENCES course(id),
	folder_id INTEGER REFERENCES user_favorite_folders(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY (user_id, course_id)
);

COMMIT;
