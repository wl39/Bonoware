import ClickAwayListener from '@material-ui/core/ClickAwayListener';
//icon
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from '@material-ui/core/Tooltip';
import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.jsx";
import { Auth } from 'aws-amplify';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
// import "assets/scss/material-dashboard-pro-react.css?v=1.2.0";
import CardHeader from 'components/Card/CardHeader.jsx';
import CardIcon from 'components/Card/CardIcon.jsx';
// dependency plugin for react-big-calendar
import moment from "moment";
import 'moment/locale/ko';
import React, { Children } from "react";
// react component used to create a calendar with events on it
import BigCalendar from "react-big-calendar";
// react component used to create alerts
import SweetAlert from "react-bootstrap-sweetalert";




moment.locale('ko')
//BigCalendar.momentLocalizer(moment);
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
//BigCalendar.setLocalizer(BigCalendar);


const CURRENT_DATE = moment().startOf('day');
// const CURRENT_MONTH = () => {

//     return new Date(moment().startOf('year'), moment().startOf("month", 1))
// }

const compare = (dateTimeA, dateTimeB) => {
    var momentA = moment(dateTimeA, "DD/MM/YYYY");
    var momentB = moment(dateTimeB, "DD/MM/YYYY");
    if (momentA > momentB) return "none";
    else if (momentA < momentB) return "none";
    else return "#e5e5e5";
}

// example implementation of a wrapper
const ColoredDateCellWrapper = ({ children, value }) => (
    React.cloneElement(Children.only(children), {
        style: {
            ...children.style,
            backgroundColor: compare(CURRENT_DATE, value),
        },

    }));


class ReleaseCalanderSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            alert: null,
            open: false,
        };
        this.hideAlert = this.hideAlert.bind(this);
    }

    componentWillMount() {
        Auth.currentCredentials()
            .then(credentials => {
                //console.log(credentials)
                const db = new DynamoDB.DocumentClient({
                    credentials: Auth.essentialCredentials(credentials)

                });
                let params2 = {
                    TableName: "Calender"
                }
                db.scan(params2, (err, data) => {
                    if (err) console.log(err);
                    else {
                        let eventArray = [];
                        this.setState(prevState => ({
                            events: eventArray
                        }))
                    }
                })
            })
    }


    handleTooltipClose = () => {
        this.setState({ open: false });
    };

    handleTooltipOpen = () => {
        this.setState({ open: true });
    };

    selectedEvent(event) {
        alert(event.title);
    }
    addNewEventAlert(slotInfo) {
        this.setState({
            alert: (
                <SweetAlert
                    input
                    showCancel
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Input something"
                    onConfirm={e => this.addNewEvent(e, slotInfo)}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                    }
                    cancelBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.danger
                    }
                />
            )
        });
    }
    addNewEvent(e, slotInfo) {
        var newEvents = this.state.events;
        newEvents.push({
            title: e,
            start: slotInfo.start,
            end: slotInfo.end
        });
        this.setState({
            alert: null,
            events: newEvents
        });
    }
    hideAlert() {
        this.setState({
            alert: null
        });
    }
    eventColors(event, start, end, isSelected) {
        var backgroundColor = "event-";
        event.color
            ? (backgroundColor = backgroundColor + event.color)
            : (backgroundColor = backgroundColor + "default");
        return {
            className: backgroundColor
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <div>

                {this.state.alert}

                <Card>
                    <CardHeader color="gray" stats icon style={{ marginLeft: "auto", marginRight: "auto" }}>

                        <CardIcon color="gray" style={{ marginRight: "0", width: "100%", paddingRight: "0px" }}>
                            <ListItem style={{ padding: "0px" }}>
                                <ListItemIcon>
                                    <Icon style={{ color: "white", margin: "0px", marginRight: "4px" }}>calendar_today</Icon>
                                </ListItemIcon>
                                <h5 >출시 캘린더</h5>
                                <ClickAwayListener onClickAway={this.handleTooltipClose}>
                                    <div>
                                        <Tooltip
                                            PopperProps={{
                                                disablePortal: true,
                                            }}
                                            onClose={this.handleTooltipClose}
                                            open={this.state.open}
                                            id="tooltip-top"
                                            title="월간 출시되는 한정판 신발들을 모아둔 달력입니다."
                                            placement="top"
                                            disableFocusListener disableTouchListener
                                            classes={{ tooltip: classes.tooltip }}
                                            className={classes.cardCategory}

                                        >
                                            <IconButton onClick={this.handleTooltipOpen} className={classes.tooltipButton}
                                            >
                                                <Icon className={classes.tooltipAlert}>live_help</Icon>
                                            </IconButton>

                                        </Tooltip>
                                    </div>
                                </ClickAwayListener>
                            </ListItem>

                        </CardIcon>
                    </CardHeader>
                    <CardBody calendar>
                        <BigCalendar
                            selectable
                            culture='ko'
                            events={this.state.events}
                            // components={{
                            //     agenda: {
                            //         event: this.state.events
                            //     }
                            // }}
                            //length={10}
                            defaultView="month"
                            defaultDate={new Date(new Date().getFullYear(), new Date().getMonth())}

                            onSelectEvent={event => this.selectedEvent(event)}
                            // onSelectSlot={slotInfo => this.addNewEventAlert(slotInfo)}
                            eventPropGetter={this.eventColors}
                            views={['month', 'agenda']}
                            components={{
                                dateCellWrapper: ColoredDateCellWrapper,
                            }}

                        />
                    </CardBody>
                </Card>


            </div>
        );
    }
}

export default withStyles(buttonStyle)(ReleaseCalanderSection);
