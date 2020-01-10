import React from 'react';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const SeriesListItem = ({series}) =>(
    <Link to={`/series/${series.show.id}`}style={{textDecoration: 'none',color:'#5a91c3',fontSize:'24px'}}>
        <ListItem button>
        <ListItemText primary={series.show.name}  />
        </ListItem>
    </Link>
)

const SeriesList = (props)=>{
    return(
        <div style={{
            position:'relative',
            margin: '0 6px 6px'
        }}>
            <List component="nav">
                {props.list.map(series=>(
                    <SeriesListItem series={series} key={series.show.id}/>
                ))}
            </List>
        </div>
    )
}

export default SeriesList;