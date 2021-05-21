create table users (
    userId INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    Fname VARCHAR(255) NOT NULL,
    phoneNumber INT NOT NULL,
    lang VARCHAR(255) DEFAULT 'English',
    currency VARCHAR(255) DEFAULT 'USD',
    PRIMARY KEY(userId)
);

create table passwordTable(
    userId INT NOT NULL AUTO_INCREMENT,
    pass VARCHAR(255) NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

create table groupTable (
    groupId INT NOT NULL AUTO_INCREMENT,
    groupName VARCHAR(255) NOT NULL,
    PRIMARY KEY(groupId)
);

CREATE TABLE userGroup (
    userId INT NOT NULL,
    groupId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (groupId) REFERENCES groupTable(groupId) ON DELETE CASCADE
);
--  0->Invited 1->Accepted 2->Rejected
CREATE TABLE invites (
    userId INT NOT NULL,
    groupId INT NOT NULL,
    invStatus INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (groupId) REFERENCES groupTable(groupId) ON DELETE CASCADE
);

-- #########################################################################
-- #########################################################################


CREATE TABLE transactionTable (
    transactionId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    groupId INT NOT NULL,
    discription VARCHAR(255) NOT NULL,
    amount FLOAT NOT NULL,
    ts TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (groupId) REFERENCES groupTable(groupId) ON DELETE CASCADE
);

CREATE TABLE userTransaction (
    user1 INT,
    user2 INT,
    transactionId INT,
    amountPerPerson FLOAT,
    FOREIGN KEY (transactionId) REFERENCES transactionTable(transactionId) ON DELETE CASCADE
);

CREATE TABLE masterTable (
    user1 INT NOT NULL,
    user2 INT NOT NULL,
    groupId INT NOT NULL,
    balance FLOAT NOT NULL,
    FOREIGN KEY (groupId) REFERENCES groupTable(groupId) ON DELETE CASCADE
);
