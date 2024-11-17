import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import axios from 'axios';

const AudienceBuilder = () => {
  const [conditions, setConditions] = useState([{ field: '', operator: '', value: '' }]);
  const [audienceSize, setAudienceSize] = useState(null);
  const [error, setError] = useState('');

  const handleConditionChange = (index, key, value) => {
    const newConditions = [...conditions];
    newConditions[index][key] = value;
    setConditions(newConditions);
  };

  const addCondition = () => {
    setConditions([...conditions, { field: '', operator: '', value: '' }]);
  };

  const removeCondition = (index) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    setConditions(newConditions);
  };

  const validateConditions = () => {
    for (let condition of conditions) {
      if (!condition.field || !condition.operator || !condition.value) {
        setError('All fields must be filled for each condition.');
        return false;
      }
    }
    setError('');
    return true;
  };

  const calculateAudienceSize = async () => {
    if (!validateConditions()) return;

    try {
      const response = await axios.post('http://localhost:999/api/audience-size', {
        conditions,
      });
      setAudienceSize(response.data.audienceSize);
      setError('');
    } catch (error) {
      console.error('Error calculating audience size:', error);
      setError('Failed to calculate audience size. Please try again.');
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 800,
        margin: 'auto',
        padding: '30px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
        Build Audience Segment
      </Typography>
      {conditions.map((condition, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
            gap: '10px',
            padding: '10px',
            backgroundColor: '#ffffff',
            borderRadius: '5px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <FormControl variant="outlined" sx={{ flex: 1, minWidth: 150 }}>
            <InputLabel>Field</InputLabel>
            <Select
              value={condition.field}
              onChange={(e) => handleConditionChange(index, 'field', e.target.value)}
              label="Field"
            >
              <MenuItem value="totalSpending">Total Spending</MenuItem>
              <MenuItem value="visits">Visits</MenuItem>
              <MenuItem value="lastVisit">Last Visit</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ flex: 1, minWidth: 100 }}>
            <InputLabel>Operator</InputLabel>
            <Select
              value={condition.operator}
              onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
              label="Operator"
            >
              <MenuItem value=">">{'>'}</MenuItem>
              <MenuItem value="<">{'<'}</MenuItem>
              <MenuItem value="=">{'='}</MenuItem>
              <MenuItem value=">=">{'>='}</MenuItem>
              <MenuItem value="<=">{'<='}</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Value"
            variant="outlined"
            value={condition.value}
            onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
            sx={{ flex: 1, minWidth: 120 }}
          />

          <Button
            variant="outlined"
            color="error"
            onClick={() => removeCondition(index)}
            sx={{ flexShrink: 0 }}
          >
            Remove
          </Button>
        </Box>
      ))}

      <Box sx={{ marginBottom: 3, display: 'flex', gap: '10px' }}>
        <Button variant="contained" onClick={addCondition} sx={{ backgroundColor: '#4caf50' }}>
          Add Condition
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={calculateAudienceSize}
          sx={{ backgroundColor: '#3f51b5' }}
        >
          Calculate Audience Size
        </Button>
      </Box>

      {error && (
        <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      {audienceSize !== null && (
        <Typography
          variant="h6"
          sx={{
            marginTop: 3,
            padding: '10px',
            backgroundColor: '#e3f2fd',
            borderRadius: '5px',
            color: '#3f51b5',
          }}
        >
          Audience Size: {audienceSize}
        </Typography>
      )}
    </Paper>
  );
};

export default AudienceBuilder;
