import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from '../../../lib/redux/userSlice';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { Navbar, Container } from "react-bootstrap"; //NavDropdown, Row, Col, Nav
//import logo from "../../images/logo/logo-with-quote.png";
import styles from './doctorHeader.module.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import profileicon from "../../images/Icons/profile.svg";
import { getDoctorByUserId, getUnreadNotificationsCount, putMarkAsReadNotification,updateDoctorTimeZone } from "../../../lib/service/FrontendApiServices";
import { toast } from "react-toastify";
import momentTz from "moment-timezone";
import NotificationMenuDoctor from "./NotificationMenu/NotificationMenuDoctor";

const DoctorHeader = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout())
        router.push('/')
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const systemTimeZone = momentTz.tz.guess();

    useEffect(() => {
        getCurrentDoctor();
    }, [currentProfileDets]);
    const getCurrentDoctor = async () => {
        const res = await getDoctorByUserId(loggedInUserId);
        if (res && res.data) {
            res.data.doctors.map((value, index) => {
                if (value && value.doctorTimeZone !== systemTimeZone) {
                    handleSubmit(value.id, systemTimeZone);
                }
                else {
                    // cookies.set("profileDetails", value, {
                    //     path: "/"
                    // })
                }
            });
        }
    };
    const handleSubmit = async (id, timezone) => {
        const payload = {
            id: id,
            doctorTimeZone: timezone,
        };
        const response = await updateDoctorTimeZone(payload);
        if (response) {
            toast(`Your timezone has been changed to : ${timezone}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                toastId: 'time-zone-toast'
            });
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {
        patientDetailsList,
        unReadMessageList,
        currentDoctor: { picture = null },
    } = props;
    const unReadMessageCount =
        (unReadMessageList && Object.keys(unReadMessageList).length) || 0;

    //NOTIFICATION BADGE COUNT LOGIC
    const [badgeCount, setBadgeCount] = useState(0);
    const unreadNotificationCountHandler = async () => {
        //const user = cookies.get("profileDetails");
        const userId = user.userId;
        const response = await getUnreadNotificationsCount(loggedInUserId).catch(err => (console.log({ err })));
        const notificationsCount = response.data.data;
        if (notificationsCount > 0) {
            setBadgeCount(notificationsCount);
        }
        else {
            setBadgeCount(0);
        }
    }

    useEffect(() => {
        unreadNotificationCountHandler();
    }, []);


    //MARK AS READ NOTIFICATION LOGIC
    const markAsReadNotificationHandler = async () => {
        const user = cookies.get("profileDetails");
        const userId = user.userId;

        const response = await putMarkAsReadNotification(userId).catch(err => (console.log({ err })));

        if (response.data.status === true) {
            setBadgeCount(0);
            // toast.success("Notification marked as read successfully");
        }
    }
    return (
        <Navbar variant="dark" expand="lg" id="navbar" sticky="top">
            <Container className="p-0 d-flex">
                <NavLink to="/doctor" className="m-0 mr-auto">
                    <img
                        src={logo}
                        id="icon"
                        alt="HealthierU Logo"
                        style={{ width: "160px" }}
                    />
                </NavLink>
                <button
                    className={styles.navbar-toggler}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className={styles.navbar-toggler-icon}></span>
                </button>
                <div className={styles.navbar-collapse} id="navbarSupportedContent">
                    <NavLink to="/doctor" style={{ margin: "5px" }}>
                        Home
                    </NavLink>
                    <div className={styles.headerNavbar}>
                        <button
                            type="button"
                            className={styles.dropdown-toggle}
                            data-toggle="dropdown"
                        >
                            My Portal
                        </button>
                        <div className={styles.dropdown-menu}>
                            <NavLink to="/doctor/appointment" className={styles.dropdown-item}>
                                My Calendar
                            </NavLink>
                            <NavLink to="/doctor/my-patients" className={styles.dropdown-item}>
                                My Patients
                            </NavLink>
                            <NavLink to="/doctor/chat" className={styles.dropdown-item}>
                                Chat
                            </NavLink>
                        </div>
                    </div>
                    {
                        <div onClick={() => markAsReadNotificationHandler()}>
                            <div className="dropdown headerNavbar notification-Navbar">
                                <IconButton
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                    type="button"
                                    data-toggle="dropdown"
                                >
                                    <Badge badgeContent={badgeCount} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <div
                                    className="dropdown-menu notification-Menu"
                                    style={{ width: "350px", left: "-160px" }}
                                >
                                    <NotificationMenuDoctor />
                                </div>
                            </div>
                        </div>
                    }
                    <NavLink to="#">
                        {currentProfileDets?.picture ? (
                            <img
                                id="profilePicId"
                                src={currentProfileDets?.picture}
                                alt=""
                                onClick={handleClick}
                                className="profile-icon"
                            />
                        ) : (
                            <img
                                src={profileicon}
                                onClick={handleClick}
                                alt=""
                                className="profile-icon"
                                width="35"
                            />
                        )}
                    </NavLink>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                        className="profile-menu"
                    >
                        <div onClick={handleClose}>
                            <Link href="/doctor/profile" style={{ textDecoration: "none" }}>
                                <MenuItem>Profile</MenuItem>
                            </Link>
                            <Link
                                href="/doctor/changepassword"
                                style={{ textDecoration: "none" }}
                            >
                                <MenuItem>Change Password</MenuItem>
                            </Link>
                            <Link href={handleLogout} style={{ textDecoration: "none" }}>
                                <MenuItem>Logout</MenuItem>
                            </Link>
                        </div>
                    </Menu>
                </div>
            </Container>
        </Navbar>
    )
}

export default DoctorHeader