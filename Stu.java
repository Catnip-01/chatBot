package week4;

import java.sql.*;

public class Stu {

    private static final String URL = "jdbc:mysql://localhost:3306/bank";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    public static void main(String[] args) {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
            conn.setAutoCommit(false);

            try (PreparedStatement ps = conn.prepareStatement("INSERT INTO bank (no, name, type, balance) VALUES (?, ?, ?, ?)")) {
                // Insert accounts
                insertAccount(ps, 101, "Alice", "Savings", 5000.75);
                conn.commit();
                System.out.println("Inserted sample accounts.");

                displayAccounts(conn);

                // Demonstrate rollback on error
                try (Statement stmt = conn.createStatement()) {
                    stmt.executeUpdate("INSERT INTO bank (no, name, type, balance) VALUES (104, 'Dave', 'Current', -1500.0)");
                    conn.commit();
                } catch (SQLException e) {
                    conn.rollback();
                    System.out.println("Rolled back on error: " + e.getMessage());
                }

                // Demonstrate savepoint rollback
                Savepoint sp = conn.setSavepoint("BeforeFaultyInsert");
                try {
                    insertAccount(ps, 105, "Eve", "Savings", 12000.0);
                    conn.commit();
                    try (Statement stmt = conn.createStatement()) {
                        stmt.executeUpdate("INSERT INTO bank (no, name, type, balance) VALUES (107, 'Grace', 'Checking', NULL)");
                        conn.commit();
                    }
                } catch (SQLException e) {
                    conn.rollback(sp);
                    System.out.println("Rolled back to savepoint: " + e.getMessage());
                }

                displayAccounts(conn);
            } catch (SQLException e) {
                conn.rollback();
                e.printStackTrace();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void insertAccount(PreparedStatement ps, int no, String name, String type, double balance) throws SQLException {
        ps.setInt(1, no);
        ps.setString(2, name);
        ps.setString(3, type);
        ps.setDouble(4, balance);
        ps.executeUpdate();
    }

    private static void displayAccounts(Connection conn) throws SQLException {
        try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery("SELECT * FROM bank")) {
            while (rs.next()) {
                System.out.printf("No: %d, Name: %s, Type: %s, Balance: %.2f%n", rs.getInt("no"),
                        rs.getString("name"), rs.getString("type"), rs.getDouble("balance"));
            }
        }
    }
}
