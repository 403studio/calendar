<template>
  <div class="calendar">
    <header class="calendar__header">
      <h1 class="calendar__title">{{title}}</h1>
      <div class="calendar__operation">
        <el-button-group>
          <el-button icon="el-icon-arrow-left" @click="preMonth">上一月</el-button>
          <el-button @click="goToToday">今天</el-button>
          <el-button icon="el-icon-arrow-right" @click="nextMonth">下一月</el-button>
        </el-button-group>
      </div>
    </header>
    <main class="calendar__body">
      <div class="calendar__day">
        <div class="calendar__day--title">周一</div>
        <div class="calendar__day--title">周二</div>
        <div class="calendar__day--title">周三</div>
        <div class="calendar__day--title">周四</div>
        <div class="calendar__day--title">周五</div>
        <div class="calendar__day--title">周六</div>
        <div class="calendar__day--title">周日</div>
      </div>
      <div class="calendar__table">
        <div
          class="calendar__date"
          :class="{
            'calendar__date--pre': day.type === 'pre',
            'calendar__date--next': day.type === 'next'
          }"
          v-for="day in days"
          :key="day.formatDate"
        >
          <span
            class="calendar__date-title"
            :class="currentDate === day.formatDate ? 'calendar__date--current' : ''"
          >
            {{day.formatDate}}
          </span>
          <ul class="calendar__event">
            <li class="calendar__event-item">测试</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      currentDate: null,
      selectedDate: null,
      formatter: 'M-D',
      days: []
    }
  },
  computed: {
    title () {
      return this.$moment(this.selectedDate).format('Y年M月')
    }
  },
  mounted () {
    this.selectedDate = this.$moment().format()
    this.currentDate = this.$moment().format(this.formatter)
    this.initDays()
  },
  methods: {
    initDays () {
      this.days = []
      const daysInMonth = this.$moment(this.selectedDate).daysInMonth()
      for (let i = 1; i <= daysInMonth; i++) {
        this.days.push({
          date: this.$moment(this.selectedDate).date(i),
          formatDate: this.$moment(this.selectedDate).date(i).format(this.formatter),
          num: i,
          type: 'current'
        })
      }
      this.addExtraDays()
    },
    addExtraDays () {
      const firstDate = this.$moment(this.selectedDate).date(1)
      let i = firstDate.day()
      if (i === 0) i = 7
      while (i > 1) {
        this.days.unshift({
          date: firstDate.subtract(1, 'days'),
          formatDate: firstDate.format(this.formatter),
          num: firstDate.date(),
          type: 'pre'
        })
        i--
      }
      const lastDate = this.$moment(this.selectedDate).date(
        this.$moment(this.selectedDate).daysInMonth()
      )
      for (let i = lastDate.day(); i < 7; i++) {
        this.days.push({
          date: lastDate.add(1, 'days'),
          formatDate: lastDate.format(this.formatter),
          num: lastDate.date(),
          type: 'next'
        })
      }
    },
    preMonth () {
      const currentDateObj = this.$moment(this.selectedDate)
      this.selectedDate = currentDateObj.subtract(1, 'month')
      this.initDays()
    },
    nextMonth () {
      const currentDateObj = this.$moment(this.selectedDate)
      this.selectedDate = currentDateObj.add(1, 'month')
      this.initDays()
    },
    goToToday () {
      this.selectedDate = this.$moment().format()
      this.initDays()
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 8px;
  .calendar__header {
    flex: 0 0 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .calendar__title {
    font-size: 24px;
    font-weight: bold;
  }
  .calendar__day {
    display: flex;
    height: 30px;
    .calendar__day--title {
      flex: 1;
      text-align: center;
    }
  }
  .calendar__body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .calendar__table {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    .calendar__date {
      border: 1px solid #ccc;
      flex: 1 1 14.28%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .calendar__date-title {
        padding: 8px;
      }
      .calendar__event {
        margin: 0;
        padding: 0 3px;
        list-style: none;
      }
      .calendar__event-item {
        padding: 2px;
        box-shadow: 2px 2px 5px #ccc;
        cursor: pointer;
      }
    }
    .calendar__date--current {
      color: #409eff;
    }
    .calendar__date--pre, .calendar__date--next {
      background-color: #dcdfe6;
    }
  }
}
</style>
