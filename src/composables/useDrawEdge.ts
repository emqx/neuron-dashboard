import { ref, onMounted, nextTick, Ref } from 'vue'
import { Graph } from '@antv/x6'
import { DriverData } from '@/types/neuron'

// If you change the value here,
// also change the relevant scss variable in the src/views/overview/Index.vue file
const BLOCK_DISTANCE = 24
const ARROW_DISTANCE = 16
const CIRCLE_RADIUS = 8
const A_ROW_MAX_CARDS_NUM = 3

export default () => {
  const upEdgeContentEl = ref()
  const downEdgeContentEl = ref()

  let upGraph: any = null
  let downGraph: any = null

  let canvasWidth = 1000
  let canvasHeight = 60
  let cardItemWidth = 0
  let northListLength = 0
  let southListLength = 0

  const countXCoordinateArr = (total: number) => {
    const ret = []
    for (let i = 0; i < total; i += 1) {
      ret.push(countXCoordinate(total, i))
    }
    return ret
  }

  // TODO:rewrite
  const countXCoordinate = (total: number, index: number) => {
    /* 
      1. total
      2. total = 2, index = 0,1
      3, total = 3, index = 0,1,2
    */
    if (total === 1) {
      return { start: canvasWidth / 2, end: canvasWidth / 2 }
    } else if (total === 2) {
      if (index === 0) {
        return { start: canvasWidth / 2 - BLOCK_DISTANCE / 2 - canvasWidth / 2, end: canvasWidth / 2 - ARROW_DISTANCE }
      } else {
        return { start: canvasWidth / 2 + BLOCK_DISTANCE / 2 + canvasWidth / 2, end: canvasWidth / 2 + ARROW_DISTANCE }
      }
    } else {
      if (index === 0) {
        return { start: cardItemWidth / 2, end: canvasWidth / 2 - ARROW_DISTANCE }
      } else if (index === 1) {
        return { start: canvasWidth / 2, end: canvasWidth / 2 }
      } else {
        return { start: canvasWidth - cardItemWidth / 2, end: canvasWidth / 2 + ARROW_DISTANCE }
      }
    }
  }

  const countEdgeData = (XCoordinate: { start: number; end: number }, type: 'up' | 'down') => {
    const startY = type === 'up' ? CIRCLE_RADIUS : canvasHeight - CIRCLE_RADIUS
    const endY = type === 'up' ? canvasHeight : 0
    const routerY = type === 'up' ? canvasHeight - 35 : 35
    return {
      source: { x: XCoordinate.start, y: startY },
      target: { x: XCoordinate.end, y: endY },
      vertices: [{ x: XCoordinate.start, y: routerY }],
      router: { name: 'manhattan' },
      connector: { name: 'rounded' },
      panning: false,
      attrs: {
        line: {
          stroke: '#B3BEC4',
          targetMarker: 'classic',
          sourceMarker: {
            tagName: 'circle',
            r: CIRCLE_RADIUS / 2,
            cx: -CIRCLE_RADIUS / 2,
            fill: 'rgba(255,255,255,0)',
          },
        },
      },
    }
  }

  const drawUpEdge = () => {
    const edgeData = countXCoordinateArr(northListLength).map((XCoordinate: { start: number; end: number }) =>
      countEdgeData(XCoordinate, 'up'),
    )
    edgeData.forEach((edgeData) => {
      upGraph.addEdge(edgeData)
    })
  }

  const drawDownEdge = () => {
    const edgeData = countXCoordinateArr(southListLength).map((XCoordinate: { start: number; end: number }) =>
      countEdgeData(XCoordinate, 'down'),
    )
    edgeData.forEach((edgeData) => {
      downGraph.addEdge(edgeData)
    })
  }

  const draw = (northDriverListLength: number, southDriverListLength: number) => {
    canvasWidth = upEdgeContentEl.value.offsetWidth
    canvasHeight = upEdgeContentEl.value.offsetHeight
    cardItemWidth = Number(((canvasWidth - 2 * BLOCK_DISTANCE) / 3).toFixed(2))
    northListLength = northDriverListLength
    southListLength = southDriverListLength

    drawUpEdge()
    drawDownEdge()
  }

  onMounted(() => {
    upGraph = new Graph({
      container: upEdgeContentEl.value,
    })
    downGraph = new Graph({
      container: downEdgeContentEl.value,
    })
    downGraph.on('drag', (event: any) => {
      event.preventEvent()
    })
  })

  return {
    upEdgeContentEl,
    downEdgeContentEl,
    draw,
  }
}
