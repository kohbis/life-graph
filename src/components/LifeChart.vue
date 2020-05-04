<template lang="pug">
  div.container
    .form
      b-field.happens-setting
        //- .user-info
          b-numberinput(
            id="age"
            v-model="user.age"
            name="age"
            max="120"
            min="0"
            )
        ul.happens
          li.happen(v-for="(e, idx) in form.happens")
            b-numberinput.number-input(
              disabled
              controls-position="compact"
              type="is-primary"
              v-model="e.age"
              :max="user.age"
              min="0"
              )
            b-numberinput.number-input(
              controls-position="compact"
              type="is-info"
              v-model="e.score"
              max="100"
              min="-100"
              step="5"
              )
            b-input.text-input(
              v-model="e.detail"
              placeholder="コメント"
              )
            b-button(
              type="is-light"
              icon-right="minus-circle"
              @click="deleteHapeen(idx)"
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
            :disabled="hasAge"
            @click="addhappen(addedAge)"
            )
            | add

      .buttons
        b-button(type="is-primary" expanded @click="fillData()")
          | Draw
        b-button(type="is-light" expanded @click="clearData()")
          | Clear
    .line-chart
      line-chart(
        v-if="drawable"
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
      drawable: false,
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
        age: 23,
      },
      /** イベント入力値 */
      form: {
        happens: [
          { age: 0, score: 0, detail: '' },
        ]
      },
      /** 追加イベントの年齢 */
      addedAge: 0
    }
  },
  watch: {
  },
  computed: {
    hasAge() {
      return this.form.happens.map(e => e['age']).includes(this.addedAge);
    },

    tooltips() {
      return {
        enabled: true,
        displayColors: false,
        callbacks: {
          label: (tooltipItems => {
            return `${this.form.happens[tooltipItems.index]['detail']}`;
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
      this.drawable = true;
    },
    /** 初期化 */
    clearData() {
      this.drawable = false;
      this.datacollection = {};
      this.form.happens = [
          { age: 0, score: 0, detail: ''},
      ];
      this.addedAge = 0;
    },
    /** イベント 追加 */
    addhappen(age) {
      let happen = { age: age, score: 0, detail: '' };
      this.form.happens.push(happen);
      this.sortHappens();
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
    .form {
      .happens-setting {
        .happens {
          .happen {
            max-width: 100%;
            margin: 1% 0;
            display: flex;
            .number-input {
              min-width: 14%;
              margin: 0 0.5%;
            }
            .text-input {
              min-width: 65%;
              margin: 0 0.5%;
            }
          }
        }
      }
      .happen-add {
        max-width: 30%;
        margin: auto;
      }

      .buttons {
        max-width: 100%;
        margin: 1% 0;
        display: flex;
        .button {
          margin: 0 2.5%;
          max-width: 45%;
        }
      }
    }
    .line-chart {
      max-width: 100%;
      margin: 5% auto;
    }
  }
</style>
