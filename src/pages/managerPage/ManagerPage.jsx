import React, { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BookOnline, Home, ManageAccounts, MovieFilter } from "@mui/icons-material";
import { Outlet, useNavigate, useLocation, replace } from "react-router-dom";
import "./ManagerPage.scss";
import UserDropDown from "../../components/userDropdown/UserDropDown";
import { useDispatch, useSelector } from "react-redux";
import { clearUserAuth } from "../../action/actions";

const drawerWidth = 240;

const menuItems = [
    { text: "Quản lý người dùng", icon: <ManageAccounts />, path: "/manager/users" },
    { text: "Quản lý phim", icon: <MovieFilter />, path: "/manager/films" },
    { text: "Quản lý đặt vé", icon: <BookOnline />, path: "/manager/bookings" },
];

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open
        ? {
              ...openedMixin(theme),
              "& .MuiDrawer-paper": openedMixin(theme),
          }
        : {
              ...closedMixin(theme),
              "& .MuiDrawer-paper": closedMixin(theme),
          }),
}));

export default function ManagerPage() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const dispatch = useDispatch();
    const userAuth = useSelector((state) => state.counter.userAuth);

    const handleLogout = () => {
        dispatch(clearUserAuth());
        localStorage.removeItem("accessToken");
        navigate("/login");
    };
    useEffect(() => {
        if (location.pathname === "/manager") {
            navigate(menuItems[0].path, { replace: true });
        }
    }, [location.pathname, navigate]);

    return (
        <div className="manager">
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar className="flex-space">
                        <div className="flex items-center">
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ marginRight: 5, ...(open && { display: "none" }) }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap component="div">
                                Quản lý hệ thống
                            </Typography>
                        </div>
                        <UserDropDown userAuth={userAuth} logout={handleLogout} />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
                                <ListItemButton
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        minHeight: 48,
                                        px: 2.5,
                                        justifyContent: open ? "initial" : "center",
                                        backgroundColor: location.pathname === item.path ? "rgba(0, 0, 0, 0.1)" : "inherit",
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 0, justifyContent: "center", mr: open ? 3 : "auto" }}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <div className="flex items-center gap-2 text-gray-600">
                        <Home className="text-xl" /> /{" "}
                        <p>{menuItems.find((item) => item.path === location.pathname)?.text || "Tạo lịch chiếu phim"}</p>
                    </div>
                    <Outlet />
                </Box>
            </Box>
        </div>
    );
}
