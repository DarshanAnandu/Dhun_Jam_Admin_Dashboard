# Dhun Jam Admin Dashboard

Welcome to the [Dhun Jam Admin Dashboard](https://darshananandu.github.io/Dhun_Jam_Admin_Dashboard/) [project](https://github.com/DarshanAnandu/Dhun_Jam_Admin_Dashboard)! This dashboard provides a comprehensive interface for managing various venue-related settings, ensuring a seamless experience for administrators. Below, you'll find a detailed guide on the features, styles, API endpoints, and how to get started with the project.

## Features

### 1. Social
- **Resto-Bar Name:** Retrieve the resto-bar name from the "name" key in the response.

### 2. Hebbal
- **Resto-Bar Location:** Retrieve the resto-bar location from the "location" key in the response.

### 3. Charging Customers
- **Request Song Charges:** Fetch the value ("true" or "false") from the "charge_customers" key in the response.
- **Mandatory:** This value is mandatory.
- **Dynamic Fields:** Enable or disable fields based on the response. If "No," Save button and fields are greyed out.

### 4. Custom Song Request Amount
- **Amount Fetch:** Fetch an integer value from "category_6" in the response.
- **Mandatory:** Required if charging customers.
- **Minimum Value:** 99.
- **Save Button:** Enabled only when the entered value is higher than 99.

### 5. Regular Song Request Amounts
- **Amounts Fetch:** Fetch integer values from "category_7", "category_8", "category_9", "category_10" keys.
- **Mandatory:** Required if charging customers.
- **Minimum Values:** 79, 59, 39, 19.
- **Save Button:** Enabled only when all entered values are higher than the specified minimums.

### 6. Graph
- **Dynamic Graph:** Graph bars change based on the entered custom and regular amounts.
- **Graph Removal:** If charging customers is "No," the graph is removed.

## API Endpoints

### Screen 1

- **Admin Login (POST):**
  - Endpoint: `/admin/login`
  - Credentials: DJ@4 (username), Dhunjam@2023 (password).

### Screen 2

- **Admin Details (GET):**
  - Endpoint: `/admin/id`
  - ID: Use the ID from the successful login response.

- **Price Update (PUT):**
  - Endpoint: `/admin/id`
  - Save newly entered price amounts.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DarshanAnandu/Frontend-Assignment-3
   ```

2. **Install Dependencies:**
   ```bash
   cd Frontend-Assignment-3
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm start
   ```

## Usage

1. Navigate to the login screen and use the provided credentials.
2. Explore and manage venue settings on the dashboard.


## License

This project is licensed under the [MIT License](LICENSE).

Feel free to customize this template according to your project's specific details and requirements.