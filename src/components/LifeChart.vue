<template lang="pug">
  div.container
    b-field.user-info
      b-select.control(
        v-model="user.age"
        placeholder="Select your age"
        )
        option(
          v-for="option in ageRange"
          :value="option"
          )
          | {{ option }}
    .form(v-if="user.age")
      b-table.happens(
        :data="form.happens"
        )
        template(slot-scope="props")
          b-table-column(
            field="age"
            label="Age"
            width="70"
            numeric
            centered
            )
            b-input(
              disabled
              v-model="props.row.age"
              )
          b-table-column(
            field="score"
            label="Score"
            width="140"
            numeric
            centered
            )
            b-numberinput(
              controls-position="compact"
              type="is-info"
              v-model="props.row.score"
              max="100"
              min="-100"
              step="5"
              )
          b-table-column(
            field="comment"
            label="Comment"
            centered
            )
            b-input(
              v-model="props.row.comment"
              placeholder="コメント"
              )
          b-table-column
            b-button(
              type="is-light"
              icon-right="minus-circle"
              @click="deleteHapeen(props.index)"
              )

      b-field.happen-add
        b-numberinput(
            id="addAge"
            expanded
            controlsPosition="compact"
            type="is-dark"
            v-model="addedAge"
            :max="user.age"
            min="0"
          )
        p
          button.button(
            :disabled="addableAge"
            @click="addhappen(addedAge)"
            )
            | add

      .buttons
        b-button(
          :disabled="!drawable"
          type="is-primary"
          expanded
          @click="fillData()"
          )
          | Draw
        b-button(
          type="is-light"
          expanded
          @click="clearData()"
          )
          | Clear
    .line-chart
      line-chart(
        v-if="showGraph"
        :chart-data="datacollection"
        :options="options"
        )
</template>

<script>
import LineChart from './LineChart.js';

export default {
  components: {
    LineChart,
  },
  data: () => {
    return {
      /** グラフ 表示フラグ */
      showGraph: false,
      /** Chart.js 描画データ */
      datacollection: {},
      /** Chart.js 描画オプション */
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: -100,
                max: 100
              }
            }
          ]
        },
        tooltips: {}
      },
      /** ユーザー情報 */
      user: {
        age: null,
      },
      /** イベント入力値 */
      form: {
        happens: [
          { age: 0, score: 0, comment: '' },
        ]
      },
      /** 追加イベントの年齢 */
      addedAge: 1
    }
  },
  watch: {
  },
  computed: {
    /** グラフ 描画可否フラグ */
    drawable() {
      return this.form.happens.length > 1;
    },
    /** イベント追加可能な年齢か */
    addableAge() {
      return this.form.happens.map(e => e['age']).includes(this.addedAge);
    },
    /** 年齢プルダウン用の配列生成 */
    ageRange() {
      const start = 17;
      const end = 120;
      return [...Array(end - start + 1).keys()].map(e => e + start);
    },
    /** Chart.js tooltips */
    tooltips() {
      return {
        enabled: true,
        displayColors: false,
        callbacks: {
          label: (tooltipItems => {
            return `${this.form.happens[tooltipItems.index]['comment']}`;
          })
        }
      }
    }
  },
  methods: {
    /** データセット */
    fillData() {
      this.datacollection = {
        labels: this.form.happens.map(e => e['age']),
        datasets: [
          {
            label: '人生グラフ',
            lineTension: 0.2,
            data: this.form.happens.map(e => e['score'])
          }
        ]
      }
      this.options.tooltips = this.tooltips;
      this.showGraph = true;
    },
    /** 初期化 */
    clearData() {
      this.showGraph = false;
      this.datacollection = {};
      this.form.happens = [
          { age: 0, score: 0, comment: ''},
      ];
      this.addedAge = 1;
    },
    /** イベント 追加 */
    addhappen(age) {
      let happen = { age: age, score: 0, comment: '' };
      this.form.happens.push(happen);
      this.sortHappens();

      if (age != this.user.age) this.addedAge++;
    },
    /** イベント 削除 */
    deleteHapeen(idx) {
      this.form.happens.splice(idx, 1);
      this.sortHappens();
    },
    /** イベント ソート */
    sortHappens() {
      this.form.happens.sort((a, b) => {
        return a['age'] - b['age'];
      });
    },
    /** スコア値 ランダム生成 */
    getRandomInt() {
      // -100 ~ 100
      return Math.floor(Math.random() * 200 - 100);
    }
  }

}
</script>

<style lang="scss" scoped>
  .container {
    max-width: 80vw;
    .user-info {
      max-width: 30%;
      margin: 1vh auto;
      .control {
        text-align: center;
      }
    }
    .form {
      .happens {
        max-width: 100%;
        margin: 1vh auto;
      }
      .happen-add {
        max-width: 200px;
        margin: 2vh auto;
      }

      .buttons {
        max-width: 100%;
        margin: 1vh 0;
        display: flex;
        .button {
          margin: 0 1vw;
          max-width: 45%;
        }
      }
    }
    .line-chart {
      max-width: 100%;
      margin: 5vh auto;
    }
  }
</style>
