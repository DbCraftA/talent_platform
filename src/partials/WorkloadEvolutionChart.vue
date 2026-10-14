<template>
  <div class="workload-chart" aria-label="Illustration conceptuelle de l'évolution de la charge dans le temps">
    <div class="workload-chart__canvas" role="img" :aria-label="chartDescription">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from 'chart.js'

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, CategoryScale, Tooltip)

const canvasRef = ref(null)
let chart = null

const chartDescription = 'Illustration montrant une charge qui augmente du prototype à la montée en charge et finit par dépasser un seuil de capacité.'

const labels = [
  '',
  'Prototype',
  '',
  '',
  'Premiers usages',
  '',
  '',
  'Montée en charge',
  '',
]

// Illustrative values used only to explain workload growth.
// These values are not benchmark or customer data.
const workloadValues = [12, 18, 24, 32, 40, 50, 61, 74, 88]
const capacityThresholdValues = [65, 65, 65, 65, 65, 65, 65, 65, 65]

const getCssVariable = (variable, fallback) => {
  if (typeof window === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
  return value || fallback
}

const adjustColorOpacity = (color, opacity) => {
  if (color.startsWith('#')) {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  if (color.startsWith('hsl')) {
    return color.replace('hsl(', 'hsla(').replace(')', `, ${opacity})`)
  }

  if (color.startsWith('oklch')) {
    return color.replace(/oklch\((.*?)\)/, (_, value) => `oklch(${value} / ${opacity})`)
  }

  return color
}

const chartAreaGradient = (ctx, chartArea, colorStops) => {
  if (!ctx || !chartArea || !colorStops?.length) return 'transparent'

  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
  colorStops.forEach(({ stop, color }) => gradient.addColorStop(stop, color))
  return gradient
}

const colors = () => ({
  violet: getCssVariable('--color-indigo-500', '#6366f1'),
  red: getCssVariable('--color-red-500', '#ef4444'),
  gray50: getCssVariable('--color-gray-50', '#f9fafb'),
  gray100: getCssVariable('--color-gray-100', '#f3f4f6'),
  gray200: getCssVariable('--color-gray-200', '#e5e7eb'),
  gray400: getCssVariable('--color-gray-400', '#9ca3af'),
  gray500: getCssVariable('--color-gray-500', '#6b7280'),
  white: getCssVariable('--color-white', '#ffffff'),
})

const phaseBackgroundPlugin = {
  id: 'phaseBackground',
  beforeDatasetsDraw(chartInstance) {
    const { ctx, chartArea, scales } = chartInstance
    const xScale = scales.x

    if (!chartArea || !xScale) return

    const zoneColor = adjustColorOpacity(colors().gray100, 0.45)
    const phases = [
      { start: -0.5, end: 2.5, color: zoneColor },
      { start: 2.5, end: 5.5, color: 'transparent' },
      { start: 5.5, end: 8.5, color: zoneColor },
    ]

    ctx.save()
    phases.forEach((phase) => {
      if (phase.color === 'transparent') return
      const startX = Math.max(chartArea.left, xScale.getPixelForValue(phase.start))
      const endX = Math.min(chartArea.right, xScale.getPixelForValue(phase.end))
      ctx.fillStyle = phase.color
      ctx.fillRect(startX, chartArea.top, endX - startX, chartArea.bottom - chartArea.top)
    })
    ctx.restore()
  },
}

const quotaLabelPlugin = {
  id: 'quotaLabel',
  afterDatasetsDraw(chartInstance) {
    const { ctx, chartArea, scales } = chartInstance
    const yScale = scales.y

    if (!chartArea || !yScale) return

    const c = colors()
    const y = yScale.getPixelForValue(65)

    ctx.save()
    ctx.fillStyle = c.red
    ctx.font = '600 12px Inter, sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText('Quotas', chartArea.right + 10, y)
    ctx.restore()
  },
}

const buildChartData = () => {
  const c = colors()

  return {
    labels,
    datasets: [
      {
        label: 'Charge / usage',
        data: workloadValues,
        borderColor: c.violet,
        fill: true,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart
          return chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: adjustColorOpacity(c.violet, 0) },
            { stop: 1, color: adjustColorOpacity(c.violet, 0.14) },
          ])
        },
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: c.violet,
        pointHoverBackgroundColor: c.violet,
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 12,
        tension: 0.25,
      },
      {
        label: 'Seuil de capacité',
        data: capacityThresholdValues,
        borderColor: c.red,
        borderDash: [6, 6],
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0,
        clip: 12,
        tension: 0,
      },
    ],
  }
}

onMounted(() => {
  const c = colors()

  chart = new Chart(canvasRef.value, {
    type: 'line',
    data: buildChartData(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 12,
          right: 56,
          bottom: 4,
          left: 8,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 96,
          border: {
            display: false,
          },
          ticks: {
            display: false,
            maxTicksLimit: 5,
          },
          grid: {
            color: adjustColorOpacity(c.gray200, 0.55),
            drawTicks: false,
          },
        },
        x: {
          type: 'category',
          border: {
            display: false,
          },
          grid: {
            display: false,
          },
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            color: c.gray500,
            font: {
              size: 12,
              weight: 600,
            },
            callback: (_value, index) => labels[index],
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          align: 'center',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            usePointStyle: true,
            pointStyle: 'line',
            color: c.gray500,
            padding: 20,
            font: {
              size: 12,
              weight: 600,
            },
          },
        },
        tooltip: {
          displayColors: false,
          mode: 'nearest',
          intersect: false,
          position: 'nearest',
          caretSize: 0,
          caretPadding: 16,
          cornerRadius: 8,
          padding: 10,
          titleColor: c.gray500,
          bodyColor: c.gray500,
          backgroundColor: c.white,
          borderColor: c.gray200,
          borderWidth: 1,
          callbacks: {
            title: () => false,
            label: (context) => context.dataset.label,
          },
        },
      },
      interaction: {
        intersect: false,
        mode: 'nearest',
      },
    },
    plugins: [phaseBackgroundPlugin, quotaLabelPlugin],
  })
})

onUnmounted(() => {
  chart?.destroy()
})
</script>

<style scoped>
.workload-chart__canvas {
  height: 260px;
  width: 100%;
}

@media (min-width: 768px) {
  .workload-chart__canvas {
    height: 360px;
  }
}
</style>
