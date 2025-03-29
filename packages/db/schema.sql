CREATE TABLE Users (
    uid SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE ROOMTYPE AS ENUM ('public', 'private');

CREATE TABLE Room (
    rid SERIAL PRIMARY KEY,
    room_type ROOMTYPE NOT NULL,
    room_code VARCHAR(100) UNIQUE,  -- Unique for private rooms, NULL for public
    room_name VARCHAR(100) UNIQUE NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE UserRoom (
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,  -- True if the user created the room

    PRIMARY KEY (user_id, room_id),
    FOREIGN KEY (user_id) REFERENCES Users(uid) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES Room(rid) ON DELETE CASCADE
);

CREATE TABLE Messages (
    msg_id SERIAL PRIMARY KEY,
    msg TEXT NOT NULL,
    room_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (room_id) REFERENCES Room(rid) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(uid) ON DELETE CASCADE
);

CREATE INDEX idx_messages_room ON Messages(room_id, created_at);

CREATE INDEX idx_users_hash ON Users USING HASH (uid);

