package com.uracilius.connector;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.uracilius.constants.ENV_CONSTANTS;

public class PostgresConnector {

    
    /**
     * Establishes a connection to the database and returns the connection object.
     * 
     * @return a Connection object to the database
     * @throws SQLException if a database access error occurs or the url is null
     */
    
    public static Connection connectToDatabase() throws SQLException {
        Connection conn = null;
        try {
        	System.out.println(ENV_CONSTANTS.POSTGRES_PATH);
            conn = DriverManager.getConnection(ENV_CONSTANTS.POSTGRES_PATH, ENV_CONSTANTS.POSTGRES_USER, ENV_CONSTANTS.POSTGRES_PASS);
            System.out.println("Connected to the PostgreSQL database successfully.");
        } catch (SQLException e) {
            System.out.println("Failed to connect to the PostgreSQL database: " + e.getMessage());
            throw e;
        }
        return conn;
    }
}
