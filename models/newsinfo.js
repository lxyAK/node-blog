const mongoose = require('mongoose');
const { now } = require('jquery');

//链接数据库，test集合
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// mongoose.set('useFindAndModify', false)

const Schema = mongoose.Schema;

//创建一个Schema的实例,设计表结构
const newsinfoSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    add_time: {
      type: Date,
      required: true,
      default: "2020-8-30 00:00:00",
    },
    title: {
      type: String,
      required: true,
    },
    click: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      default:"台媒今日援引香港《南华早报》报道指出，解放军昨天(26日)上午朝南海发射两枚导弹，其中一枚是东风21D航母杀手反舰导弹，此举在于要对美国提出警告。周二美国U-2高空侦察机一度闯进解放军北部战区实弹演习禁飞区活动，让中国国防部抗议，称美国在挑衅。昨天解放军则在南海进行反舰弹道导弹试射，美军出动侦察机进行侦搜。报道指出，解放军发射的是东风26B和东风21D导弹，意在警告美国。这两枚导弹分别从青海和浙江发射，朝向海南省和西沙群岛间的海域。先前海南海事局曾经宣布，24日到29日要在海南岛东南部海域进行军事训练，这两枚导弹都落入演习禁航区。《南华早报》引述消息人士的话说，这是回应美国最近频频对中国大陆的侦查行动，也藉由试射，吓阻其他想介入南海争议的势力，不希望邻国误会北京的意图。香港军事评论员宋中平认为，这明显是向美国释出讯息，表达就算是美国航舰，也不能在中国大陆近岸展现全部实力。综合台媒报道"
    },
  },
  // 关联集合
  { collection: 'newsinfo' }
);

//创建并导出模型构造函数
const Newsinfo = mongoose.model('Newsinfo', newsinfoSchema);
module.exports = Newsinfo;
