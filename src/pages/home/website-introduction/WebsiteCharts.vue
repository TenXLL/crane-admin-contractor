<template>
  <div class="website-charts w-full box-border">
    <crane-echarts
      width="100%"
      height="280px"
      :option="options"
    ></crane-echarts>
  </div>
</template>

<script setup lang="ts">
import { EChartsOption, graphic } from 'echarts';
import { ToolTipFormatterParams } from '@/components/crane-echarts/CraneEcharts.vue';
import { graphicFactory } from '@/components/crane-echarts/echarts.ts';
import useThemeStore from '@/store/modules/theme.store.ts';

const graphicElements = ref([
  graphicFactory({ left: 0 }),
  graphicFactory({ right: 0 })
]);

const xAxis = ref<string[]>([
  '2024-01-03',
  '2024-01-04',
  '2024-01-05',
  '2024-01-06',
  '2024-01-07',
  '2024-01-08'
]);

watch(
  () => useThemeStore().isLightThem,
  () => {
    // @ts-ignore
    options.value.title!.textStyle.color = useThemeStore().isLightThem
      ? '#333'
      : '#fff';
  }
);

const options = ref<EChartsOption>({
  title: {
    text: '内容数据',
    left: 'left', // 标题水平居中
    top: 10,
    textStyle: {
      color: useThemeStore().isLightThem ? '#333' : '#fff', // 标题文字颜色
      fontSize: 18 // 标题文字大小
    }
  },
  grid: {
    left: '3.6%',
    right: '0',
    top: '60',
    bottom: '30'
  },
  xAxis: {
    type: 'category',
    offset: 2,
    data: xAxis.value,
    boundaryGap: false,
    axisLabel: {
      color: '#4E5969',
      formatter(value: number, idx: number) {
        if (idx === 0) return '';
        if (idx === xAxis.value.length - 1) return '';
        return `${value}`;
      }
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      interval: (idx: number) => {
        if (idx === 0) return false;
        return idx !== xAxis.value.length - 1;
      },
      lineStyle: {
        color: '#E5E8EF'
      }
    },
    axisPointer: {
      show: true,
      lineStyle: {
        color: '#23ADFF',
        width: 2
      }
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisLabel: {
      formatter(value: any, idx: number) {
        if (idx === 0) return value;
        return `${value}k`;
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: '#E5E8EF'
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    formatter(params: any) {
      const [firstElement] = params as ToolTipFormatterParams[];
      return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            <div class="content-panel"><span>总内容量</span><span class="tooltip-value">${(
              Number(firstElement.value) * 10000
            ).toLocaleString()}</span></div>
          </div>`;
    },
    className: 'echarts-tooltip-diy'
  },
  graphic: {
    elements: graphicElements.value
  },
  series: [
    {
      data: [300, 100, 600, 800, 500, 400],
      type: 'line',
      smooth: true,
      // symbol: 'circle',
      symbolSize: 12,
      emphasis: {
        focus: 'series',
        itemStyle: {
          borderWidth: 2
        }
      },
      lineStyle: {
        width: 3,
        color: new graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: 'rgba(30, 231, 255, 1)'
          },
          {
            offset: 0.5,
            color: 'rgba(36, 154, 255, 1)'
          },
          {
            offset: 1,
            color: 'rgba(111, 66, 251, 1)'
          }
        ])
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(17, 126, 255, 0.16)'
          },
          {
            offset: 1,
            color: 'rgba(17, 128, 255, 0)'
          }
        ])
      }
    }
  ]
});
</script>

<style scoped lang="less">
.website-charts {
  height: 280px;
  border: 1px solid var(--border-color);
  padding: 0 10px;
  margin-top: 10px;
  box-sizing: border-box;
}
</style>
