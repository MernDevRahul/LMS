import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function CourseProgress() {
  const [layout, setLayout] = React.useState('horizontal');
  const [radius, setRadius] = React.useState(5);

  return (
    <Stack direction="column" spacing={1} sx={{ width: '100%', maxWidth: '100%' }}>
      <Stack direction="row" spacing={4}>
        <Stack direction="column" spacing={1} flex={1}>
          <Typography gutterBottom>Border Radius</Typography>

        </Stack>

      </Stack>
      <BarChart
        series={[
          { dataKey: 'high', label: 'High', layout, stack: 'stack' },
          { dataKey: 'low', label: 'Low', layout, stack: 'stack' },
        ]}
        {...(layout === 'vertical' ? chartSettingsV : chartSettingsH)}
        borderRadius={radius}
      />
    </Stack>
  );
}

const dataset = [
  [2, 4, 'First'],
  [4, 7, 'Second'],
  [7, 9, 'Third'],
  [9, 14, 'Fourth'],
].map(([high, low, order]) => ({
  high,
  low,
  order,
}));
const chartSettingsH = {
  dataset,
  height: 300,
  yAxis: [{ scaleType: 'band', dataKey: 'order' }],
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
  slotProps: {
    legend: {
      direction: 'row',
      position: { vertical: 'bottom', horizontal: 'middle' },
      padding: -5,
    },
  },
};
const chartSettingsV = {
  ...chartSettingsH,
  xAxis: [{ scaleType: 'band', dataKey: 'order' }],
  yAxis: undefined,
};
