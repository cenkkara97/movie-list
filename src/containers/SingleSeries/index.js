import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
//Material UI Components
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },

  media: {
    height: '-webkit-fill-available',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class SingleSeries extends Component{
    state={
        open:false,
        show:null,
        expanded: false
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    componentDidMount(){
        const {id} = this.props.match.params;

        fetch(`http://api.tvmaze.com/shows/${id}?embed=episodes`)
            .then((response)=> response.json())
            .then(json => this.setState({show:json,open:true}))
    }

    handleExpandClick = () => {
      this.setState(state => ({ expanded: !state.expanded }));
    };

    render(){
        const {show} =this.state;
        console.log(show);
        const { classes } = this.props;
        return(
            <div>
                { show !== null &&
                    <Dialog
                        fullScreen
                        open={this.state.open}
                        onClose={this.handleClose}
                        TransitionComponent={Transition}
                    >
                        <AppBar style={styles.appBar}>
                            <Toolbar>
                                <Link to={'/'}>
                                    <IconButton color="default" onClick={this.handleClose} aria-label="Close">
                                        <CloseIcon />
                                    </IconButton>
                                </Link>
                                <Typography variant="title" style={{fontSize:'24px',width:'-webkit-fill-available',textAlign:'center'}}>
                                    {show.name}
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <div style={{
                            flex: 1,
                            display:'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Card style={{height:'380px',width:'400px',marginRight:'5%'}}>
                                <CardHeader
                                avatar={
                                    show.rating.average != null &&                                    
                                    <Avatar aria-label="Recipe" className={classes.avatar}>
                                        {show.rating.average}
                                    </Avatar>
                                }
                                title={show.name}
                                subheader={show.premiered}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={show.image.original}
                                    title={show.name}
                                />
                                </Card>
                            <Card style={{height:'380px',width:'400px',overflowY:'scroll'}}>
                                
                                <CardContent>
                                    <Typography component="p">
                                    <span dangerouslySetInnerHTML={{__html: show.summary}}></span>
                                    </Typography>
                                </CardContent>

                            </Card>
                        </div>
                    </Dialog>
                }
            </div>
        )
    }

}

// export default SingleSeries;

SingleSeries.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleSeries);