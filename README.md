# **Cryptocurrency Data Backend**

## _Project Overview_

This backend application fetches data from **CoinGecko API**, stores it in a MongoDB database, and offers various endpoints for accessing the data. This project supports retrieving real-time information on **Bitcoin**, **Ethereum**, and **Matic**, along with statistical analysis like price deviation over time.

---

## **Project Features**

- **Fetch and store real-time cryptocurrency data**: The backend fetches the current price, market cap, and 24-hour change for Bitcoin, Ethereum, and Matic every 2 hours.
- **APIs to retrieve cryptocurrency data**: The `/stats` endpoint fetches the latest data for any of the supported cryptocurrencies.
- **API to calculate price deviation**: The `/deviation` endpoint calculates the standard deviation of the cryptocurrency price based on the last 100 records.

---

## **API Endpoints**

### **1. `/stats` - Get Latest Data for a Cryptocurrency**

- **Method**: `GET`
- **Query Parameters**:
  - `coin`: (string) One of the supported cryptocurrencies: `bitcoin`, `matic-network`, `ethereum`.
  
- **Sample Request**:
  ```bash
  GET /stats?coin=bitcoin
  ```
  
- **Sample Response**:
  ```json
  {
    "price": 95362,
    "marketCap": 1888354421186.503,
    "24hChange": 3.4320456811152957
  }
  ```

### **2. `/deviation` - Get Price Deviation for the Last 100 Records**

- **Method**: `GET`
- **Query Parameters**:
  - `coin`: (string) One of the supported cryptocurrencies: `bitcoin`, `matic-network`, `ethereum`.
  
- **Sample Request**:
  ```bash
  GET /deviation?coin=bitcoin
  ```
  
- **Sample Response**:
  ```json
  {
    "deviation": 294.39
  }
  ```

---

## **Installation and Setup**

### **Prerequisites**

Before setting up the project, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB Atlas** account (for remote database)
- **Git** (for version control)

### **Step 1: Clone the Repository**

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/GitAniket98/KOINX.git
cd KOINX
```

### **Step 2: Install Dependencies**

Install all the project dependencies using npm:

```bash
npm install
```

### **Step 3: Set Up Environment Variables**

Create a `.env` file in the root directory of the project and add your **MongoDB URI**:

```
MONGO_URI=your_mongo_connection_string
```

You can get your MongoDB connection string from your [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account.

### **Step 4: Run the Project**

Run the application locally:

```bash
npm start
```

The application will now be running on `http://localhost:3000`.

---

## **Cron Job to Fetch Data**

This application uses **node-cron** to fetch cryptocurrency data every 2 hours from the **CoinGecko API** and store it in MongoDB. This process is automated through the following cron schedule:

```js
cron.schedule('0 */2 * * *', fetchCryptoData);
```

The cron job fetches data for Bitcoin, Ethereum, and Matic and stores it in the MongoDB database.

---

## **Technologies Used**

- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web framework for creating the API routes.
- **MongoDB**: NoSQL database to store cryptocurrency data.
- **Mongoose**: MongoDB ODM for schema-based data modeling.
- **Axios**: Promise-based HTTP client to make requests to the CoinGecko API.
- **Node-Cron**: To schedule background jobs to fetch data periodically.
- **CoinGecko API**: Source for cryptocurrency data.

---
