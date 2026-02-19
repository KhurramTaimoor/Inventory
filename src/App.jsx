import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';     
import AdminLogin from './pages/AdminLogin'; 
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import GenericPage from './components/GenericPage';
import LedgerPage from './components/LedgerPage'; // <--- IMPORT THIS
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage initialTab="login" />} />
        <Route path="/register" element={<AuthPage initialTab="signup" />} />
        
        {/* Hidden Admin Gateway */}
        <Route path="/sys-admin/secure-gateway" element={<AdminLogin />} />

        {/* --- PROTECTED APP ROUTES --- */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'employee']} />}>
          <Route path="/app" element={<DashboardLayout />}>
             
             {/* Default Dashboard */}
             <Route index element={<Navigate to="dashboard" replace />} />
             <Route path="dashboard" element={<DashboardHome />} />

             {/* ==========================
                 1. SALES MODULE
             ========================== */}
             <Route path="sales/customer" element={
               <GenericPage title="Customer Management" inputs={['Customer Name', 'Phone Number', 'City', 'Address', 'Credit Limit']} />
             } />
             <Route path="sales/salesman" element={
               <GenericPage title="Salesman" inputs={['Salesman Name', 'Phone', 'CNIC', 'Assigned Area', 'Commission %']} />
             } />
             <Route path="sales/retailer" element={
               <GenericPage title="Retailer" inputs={['Shop Name', 'Owner Name', 'Contact', 'City', 'Zone']} />
             } />
             <Route path="sales/area" element={
               <GenericPage title="Area Configuration" inputs={['Area Name', 'City', 'Region Code']} />
             } />
             <Route path="sales/rate-list" element={
               <GenericPage title="Rate List" inputs={['Product Item', 'Unit', 'Retail Rate', 'Wholesale Rate', 'Distributor Rate']} />
             } />
             <Route path="sales/sale-order" element={
               <GenericPage title="Sale Order" inputs={['Order No', 'Customer', 'Order Date', 'Delivery Date', 'Total Amount', 'Status']} />
             } />
             <Route path="sales/invoice" element={
               <GenericPage title="Sales Invoice" inputs={['Invoice No', 'Customer', 'Date', 'Salesman', 'Discount', 'Net Total']} />
             } />
             <Route path="sales/return" element={
               <GenericPage title="Sales Return" inputs={['Return No', 'Invoice Ref', 'Customer', 'Date', 'Return Amount', 'Reason']} />
             } />
             <Route path="sales/reports" element={
               <GenericPage title="Sales Report" inputs={['From Date', 'To Date', 'Customer', 'Salesman', 'Area']} isReport={true} />
             } />

             {/* ==========================
                 2. PURCHASE MODULE
             ========================== */}
             <Route path="purchase/supplier" element={
               <GenericPage title="Supplier Management" inputs={['Supplier Name', 'Company Name', 'Phone', 'Email', 'City', 'Opening Balance']} />
             } />
             <Route path="purchase/rate" element={
               <GenericPage title="Purchase Rates" inputs={['Item Name', 'Supplier', 'Purchase Rate', 'Effective Date']} />
             } />
             <Route path="purchase/invoice" element={
               <GenericPage title="Purchase Invoice" inputs={['Invoice No', 'Supplier', 'Date', 'Ref No', 'Total Amount']} />
             } />
             <Route path="purchase/return" element={
               <GenericPage title="Purchase Return" inputs={['Return No', 'Supplier', 'Date', 'Amount', 'Remarks']} />
             } />
             <Route path="purchase/reports" element={
               <GenericPage title="Purchase Report" inputs={['From Date', 'To Date', 'Supplier', 'Item Category']} isReport={true} />
             } />

             {/* ==========================
                 3. INVENTORY MODULE
             ========================== */}
             <Route path="inventory/product" element={
               <GenericPage title="Product Definitions" inputs={['Product Name', 'Category', 'Brand', 'Unit', 'Purchase Price', 'Sale Price', 'Reorder Level']} />
             } />
             <Route path="inventory/unit" element={
               <GenericPage title="Unit Setup" inputs={['Unit Name', 'Symbol (e.g., kg, pcs)', 'Decimal Places']} />
             } />
             <Route path="inventory/category" element={
               <GenericPage title="Product Categories" inputs={['Category Name', 'Description', 'Parent Category']} />
             } />
             <Route path="inventory/opening" element={
               <GenericPage title="Opening Stock" inputs={['Product', 'Warehouse', 'Quantity', 'Rate', 'Total Value', 'Date']} />
             } />
             <Route path="inventory/receive" element={
               <GenericPage title="Stock Receive (GRN)" inputs={['GRN No', 'Date', 'Supplier', 'Warehouse', 'Product', 'Received Qty']} />
             } />
             <Route path="inventory/issue" element={
               <GenericPage title="Stock Issue" inputs={['Issue No', 'Date', 'Department', 'Product', 'Issued Qty', 'Remarks']} />
             } />
             <Route path="inventory/reports" element={
               <GenericPage title="Inventory Report" inputs={['Product', 'Category', 'Warehouse', 'From Date', 'To Date']} isReport={true} />
             } />

             {/* ==========================
                 4. ACCOUNTS MODULE
             ========================== */}
             <Route path="accounts/groups" element={
               <GenericPage title="Chart of Account Groups" inputs={['Group Name', 'Parent Group', 'Type (Asset/Liability)']} />
             } />
             <Route path="accounts/chart" element={
               <GenericPage title="Chart of Accounts" inputs={['Account Code', 'Account Title', 'Group', 'Opening Balance']} />
             } />
             <Route path="accounts/opening" element={
               <GenericPage title="Opening Balances" inputs={['Fiscal Year', 'Account', 'Debit', 'Credit', 'Date']} />
             } />
             <Route path="accounts/journal" element={
               <GenericPage title="Journal Voucher (JV)" inputs={['Voucher No', 'Date', 'Account (Dr)', 'Account (Cr)', 'Amount', 'Narration']} />
             } />
             <Route path="accounts/cashbook" element={
               <GenericPage title="Daily Cash Book" inputs={['Date', 'Description', 'Cash In', 'Cash Out', 'Balance']} />
             } />
             
             {/* --- UPDATED: USING REAL LEDGER PAGE --- */}
             <Route path="accounts/gl-report" element={
               <LedgerPage title="General Ledger Report" entityName="General Account" />
             } />
             <Route path="accounts/cash-report" element={
               <LedgerPage title="Cash Book Report" entityName="Cash in Hand" />
             } />
             {/* -------------------------------------- */}

             {/* ==========================
                 5. HR MODULE
             ========================== */}
             <Route path="hr/departments" element={
               <GenericPage title="Departments" inputs={['Department Name', 'Head of Dept', 'Extension No']} />
             } />
             <Route path="hr/employee" element={
               <GenericPage title="Employee Registration" inputs={['Full Name', 'Father Name', 'CNIC', 'Phone', 'Designation', 'Department', 'Joining Date', 'Basic Salary']} />
             } />
             <Route path="hr/rate" element={
               <GenericPage title="Employee Rate" inputs={['Employee', 'Rate Type', 'Amount per Hour/Unit', 'Effective Date']} />
             } />
             <Route path="hr/reports" element={
               <GenericPage title="HR / Payroll Reports" inputs={['Report Type (Salary/Attendance)', 'Month', 'Year', 'Department']} isReport={true} />
             } />
             
             {/* --- UPDATED: EMPLOYEE LEDGER --- */}
             <Route path="hr/ledger" element={
               <LedgerPage title="Employee Ledger" entityName="John Doe (Sample)" />
             } />
             {/* -------------------------------- */}

             {/* ==========================
                 6. PRODUCTION MODULE
             ========================== */}
             <Route path="production/bom" element={
               <GenericPage title="Bill of Materials (BOM)" inputs={['Product Name', 'Batch Size', 'Raw Material A', 'Qty A', 'Raw Material B', 'Qty B', 'Labor Cost']} />
             } />
             <Route path="production/invoice" element={
               <GenericPage title="Production Invoice" inputs={['Batch No', 'Production Date', 'Product', 'Quantity Produced', 'Warehouse', 'Supervisor']} />
             } />
             <Route path="production/reports" element={
               <GenericPage title="Production Reports" inputs={['From Date', 'To Date', 'Product', 'Status']} isReport={true} />
             } />

             {/* ==========================
                 7. PERMISSIONS
             ========================== */}
             <Route path="permissions" element={
               <GenericPage title="User Permissions" inputs={['Select User', 'Role', 'Access Level (Read/Write/Delete)', 'Module Access']} />
             } />

          </Route>
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;