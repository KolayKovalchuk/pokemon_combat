import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper, Box } from '@mui/material';

const CombatLogs = ({ logList = [] }) => {
    return (
        <Paper elevation={3} sx={{ padding: 2, maxHeight: 400, overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Combat Logs
            </Typography>
            <List>
                {logList.length > 0 ? (
                    logList.map((log, index) => (
                        <ListItem key={index} divider>
                            <ListItemText
                                secondary={`${index + 1}. ${log}`}
                                primaryTypographyProps={{ fontWeight: 'bold' }}
                                secondaryTypographyProps={{ color: 'textSecondary' }}
                            />
                        </ListItem>
                    ))
                ) : (
                    <Box textAlign="center" p={2}>
                        <Typography variant="body1" color="textSecondary">
                            No combat logList available.
                        </Typography>
                    </Box>
                )}
            </List>
        </Paper>
    );
};

export default CombatLogs;
