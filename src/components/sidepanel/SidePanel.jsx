import "./SidePanel.css";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  Logout,
  Dashboard,
  AddShoppingCart,
  Settings,
  Person,
  Layers,
  Inventory,
} from "@mui/icons-material";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import logo from "../../assets/images/logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../contextApi/AuthContext";

const SidePanel = () => {
  const [open, setOpen] = useState(true);

  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  // below here is the updated code

  const menuItemStyles = {
    root: {
      fontSize: "19px",
      fontWeight: 400,
      marginBottom: "10px",
    },
  };

  const { toggleSidebar, collapseSidebar, collapsed, broken } = useProSidebar();

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <section>
        {broken ? (
          <button className="broken-toggle-btn" onClick={() => toggleSidebar()}>
            <AiOutlineMenuUnfold style={{ fontSize: "30px" }} />
          </button>
        ) : (
          <button className="collapse-btn" onClick={() => collapseSidebar()}>
            {collapsed ? (
              <AiOutlineMenuUnfold style={{ fontSize: "30px" }} />
            ) : (
              <AiOutlineMenuFold style={{ fontSize: "30px" }} />
            )}
          </button>
        )}
      </section>
      <Sidebar breakPoint="lg">
        <div className="sidebar-header">
          <img src={logo} alt="logo" className="sidebar-logo" />
          <section className="sidebar-header-info">
            <span style={{ fontSize: "18px", fontWeight: "700" }}>
              Beauty Avenue
            </span>
            <span>{user.email}</span>
          </section>
        </div>
        <Menu menuItemStyles={menuItemStyles}>
          <MenuItem component={<Link to="/" />} icon={<Dashboard />}>
            Dashboard
          </MenuItem>
          <MenuItem
            component={<Link to="/orders" />}
            icon={<AddShoppingCart />}
          >
            Orders
          </MenuItem>
          <MenuItem component={<Link to="/category" />} icon={<Layers />}>
            Category
          </MenuItem>
          <MenuItem component={<Link to="/products" />} icon={<Inventory />}>
            Products
          </MenuItem>
          <MenuItem component={<Link to="/users" />} icon={<Person />}>
            Users
          </MenuItem>
          <MenuItem component={<Link to="/settings" />} icon={<Settings />}>
            Settings
          </MenuItem>
          <MenuItem onClick={logout} icon={<Logout />}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
    // <div className={open ? "sidebarOpen" : "sidebarClose"}>
    //   <div className="sidebarTopSection">
    //     <img src={logo} alt="Logo" className="sidebarLogo" />
    //     {open ? (
    //       <div className="sidebarTopSectionText">
    //         <h1>Beauty Avenue</h1>
    //         <p style={{ wordBreak: "break-all" }}>{user.email}</p>
    //       </div>
    //     ) : (
    //       ""
    //     )}
    //   </div>
    //   <div className="sidebarCloseMenu" onClick={toggleOpen}>
    //     {open ? (
    //       <DensitySmall u className="sidebarMenuIcon" />
    //     ) : (
    //       <Launch className="sidebarLaunchIcon" />
    //     )}
    //   </div>
    //   <Menu style={{ fontSize: "20px" }} className="sidebarMenu">
    //     <div className="menuItem">
    //       <MenuItem
    //         icon={<Dashboard />}
    //         component={<Link to="/" />}
    //         title="Dashboard"
    //       >
    //         <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
    //           Dashboard
    //         </span>
    //       </MenuItem>
    //     </div>
    //     <MenuItem
    //       icon={<AddShoppingCart />}
    //       component={<Link to="/orders" />}
    //       title="Orders"
    //     >
    //       <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
    //         Orders
    //       </span>
    //     </MenuItem>
    //     <MenuItem
    //       icon={<CreditCard />}
    //       component={<Link to="/payment" />}
    //       title="Payments"
    //     >
    //       <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
    //         Payments
    //       </span>
    //     </MenuItem>
    //     <SubMenu label={open ? "Manage" : ""} icon={<ManageSearch />}>
    //       <MenuItem
    //         component={<Link to="/category" />}
    //         icon={<Layers />}
    //         title="Category"
    //       >
    //         <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
    //           Category
    //         </span>
    //       </MenuItem>
    //       <MenuItem
    //         component={<Link to="/products" />}
    //         icon={<Inventory />}
    //         title="Products"
    //       >
    //         <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
    //           Products
    //         </span>
    //       </MenuItem>
    //       <MenuItem
    //         component={<Link to="/variation" />}
    //         icon={<ListAlt />}
    //         title="Variation"
    //       >
    //         <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
    //           Variation
    //         </span>
    //       </MenuItem>
    //     </SubMenu>
    //     <MenuItem
    //       icon={<Person />}
    //       component={<Link to="/users" />}
    //       title="Users"
    //     >
    //       <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
    //         Users
    //       </span>
    //     </MenuItem>
    //     <MenuItem onClick={logout} icon={<Logout />} title="Logout">
    //       <span className={open ? "paymentTextOpen" : "paymentTextClose"}>
    //         Logout
    //       </span>
    //     </MenuItem>
    //   </Menu>
    // </div>

    // <Sidebar collapsed={menuCollapse}>
    //   <main>
    //     <div className="top-section">
    //       <img src={logo} alt="STI Logo" className="sidebar-logo" />
    //       <div className="sidebar-title">
    //         <div className="hori-line"></div>
    //         <h1>RIMSti</h1>
    //         <div className="hori-line"></div>
    //         <span
    //           style={{
    //             fontSize: "25px",
    //             fontWeight: "bold",
    //             wordBreak: "break-all",
    //           }}
    //         >
    //           {user.email}
    //         </span>
    //       </div>
    //     </div>
    //     <div className="closemenu" onClick={menuIconClick}>
    //       <FaBars className="iconSomething" />
    //     </div>
    //     {/* <Badge badgeContent={1} color={"primary"}>
    //       <MdCircleNotifications className="sidebar-icon" />
    //     </Badge> */}
    //   </main>
    //   <Menu style={{ fontSize: "20px" }}>
    //     <MenuItem icon={<AiOutlineDashboard />} component={<Link to="/" />}>
    //       Dashboard
    //     </MenuItem>
    //     <MenuItem
    //       icon={<AiOutlineFileSearch />}
    //       routerLink={<Link to="/orders" />}
    //     >
    //       Orders
    //     </MenuItem>
    //     <MenuItem
    //       icon={<MdOutlinePayments />}
    //       routerLink={<Link to="/payment" />}
    //     >
    //       Payments
    //     </MenuItem>
    //     <SubMenu label="Manage" icon={<MdManageAccounts />}>
    //       <MenuItem routerLink={<Link to="/category" />}>Category</MenuItem>
    //       <MenuItem routerLink={<Link to="/products" />}>Products</MenuItem>
    //       <MenuItem routerLink={<Link to="/variation" />}>Variation</MenuItem>
    //     </SubMenu>
    //     <MenuItem icon={<AiOutlineUser />} routerLink={<Link to="/users" />}>
    //       Users
    //     </MenuItem>
    //     <MenuItem onClick={logout} icon={<FiLogOut />}>
    //       Logout
    //     </MenuItem>
    //   </Menu>
    // </Sidebar>
  );
};

export default SidePanel;
