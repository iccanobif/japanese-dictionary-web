import React, { useState } from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

export default function RadicalExplorerOpener() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [filter, setFilter] = useState("")

  const textBoxRef = React.createRef()

  const onShow = () => {
    textBoxRef.current.focus()
  }

  const onFilterChanged = (e) => {
    setFilter(e.target.value)
  }

  return (
    <>
      <Button size="sm" variant="outline-secondary" onClick={() => setIsModalVisible(true)}>部首一覧</Button>
      <Modal show={isModalVisible} onHide={() => setIsModalVisible(false)} onShow={onShow} >
        <Modal.Header closeButton>
          <Modal.Title>部首一覧</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="部首を入力して下さい"
            ref={textBoxRef}
            value={filter}
            onChange={onFilterChanged}
            style={{ marginBottom: '10px' }}
          />
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="table table-striped">
              <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                <tr>
                  <th>Radical</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {mockRadicalList
                  .filter((item) => item.radical.includes(filter) || item.description.includes(filter))
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.radical}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

// TODO: Remove this mock data and replace it with a real API call.
const mockRadicalList = [
  { "radical": "一", "description": "one" },
  { "radical": "｜", "description": "line" },
  { "radical": "丶", "description": "dot" },
  { "radical": "ノ", "description": "bend" },
  { "radical": "乙", "description": "second, latter" },
  { "radical": "亅", "description": "hook" },
  { "radical": "二", "description": "two" },
  { "radical": "亠", "description": "lid" },
  { "radical": "𠆢", "description": "human, person" },
  { "radical": "人", "description": "human, person" },
  { "radical": "亻", "description": "human, person" },
  { "radical": "入", "description": "enter" },
  { "radical": "ハ", "description": "eight; divide" },
  { "radical": "ハ", "description": "animal legs" },
  { "radical": "儿", "description": "human legs" },
  { "radical": "并", "description": "horns" },
  { "radical": "冫", "description": "ice" },
  { "radical": "凵", "description": "container, open mouth, box" },
  { "radical": "匚", "description": "box" },
  { "radical": "冂", "description": "upside down box" },
  { "radical": "冖", "description": "cover" },
  { "radical": "几", "description": "desk, table" },
  { "radical": "九", "description": "nine" },
  { "radical": "力", "description": "power, force" },
  { "radical": "刀", "description": "knife, sword" },
  { "radical": "刂", "description": "knife, sword" },
  { "radical": "乃", "description": "no" },
  { "radical": "勹", "description": "wrap, embrace" },
  { "radical": "マ", "description": "katakana ma (マ)" },
  { "radical": "匕", "description": "spoon" },
  { "radical": "十", "description": "ten, complete" },
  { "radical": "卜", "description": "divination" },
  { "radical": "又", "description": "again" },
  { "radical": "厶", "description": "private, katakana mu" },
  { "radical": "卩", "description": "seal" },
  { "radical": "厂", "description": "cliff" },
  { "radical": "广", "description": "on a cliff" },
  { "radical": "口", "description": "mouth, opening" },
  { "radical": "囗", "description": "enclosure" },
  { "radical": "土", "description": "earth" },
  { "radical": "士", "description": "scholar, bachelor" },
  { "radical": "夂", "description": "to go" },
  { "radical": "夕", "description": "evening, sunset" },
  { "radical": "尢", "description": "crooked leg" },
  { "radical": "大", "description": "big, very" },
  { "radical": "女", "description": "woman, female" },
  { "radical": "子", "description": "child, seed" },
  { "radical": "宀", "description": "roof" },
  { "radical": "寸", "description": "thumb, sundial degree" },
  { "radical": "小", "description": "small, insignificant" },
  { "radical": "⺌", "description": "small, insignificant" },
  { "radical": "幺", "description": "short thread" },
  { "radical": "尸", "description": "corpse" },
  { "radical": "山", "description": "mountain" },
  { "radical": "川", "description": "river" },
  { "radical": "工", "description": "work" },
  { "radical": "已", "description": "self" },
  { "radical": "亡", "description": "dead" },
  { "radical": "巾", "description": "turban" },
  { "radical": "干", "description": "dry" },
  { "radical": "廾", "description": "two hands, twenty" },
  { "radical": "廴", "description": "long stride" },
  { "radical": "辶", "description": "walk" },
  { "radical": "也", "description": "to be" },
  { "radical": "弋", "description": "ceremony, shoot, arrow" },
  { "radical": "弓", "description": "bow" },
  { "radical": "ヨ", "description": "pig snout" },
  { "radical": "彡", "description": "hair, bristle, stubble, beard" },
  { "radical": "彳", "description": "step" },
  { "radical": "氵", "description": "water" },
  { "radical": "爿", "description": "split wood" },
  { "radical": "犭", "description": "dog" },
  { "radical": "扌", "description": "hand" },
  { "radical": "⺾", "description": "grass, vegetation" },
  { "radical": "⻖", "description": "mound (阝-left)" },
  { "radical": "⻏", "description": "town (阝-right)" },
  { "radical": "忄", "description": "heart" },
  { "radical": "心", "description": "heart" },
  { "radical": "戈", "description": "spear, halberd" },
  { "radical": "戸", "description": "door, house" },
  { "radical": "手", "description": "hand" },
  { "radical": "攵", "description": "action, whip" },
  { "radical": "文", "description": "script, literature" },
  { "radical": "斗", "description": "dipper, measuring scoop" },
  { "radical": "斤", "description": "axe" },
  { "radical": "方", "description": "way, square, raft" },
  { "radical": "日", "description": "sun, day" },
  { "radical": "月", "description": "moon, month; body, flesh" },
  { "radical": "木", "description": "tree" },
  { "radical": "欠", "description": "yawn, lack" },
  { "radical": "止", "description": "stop" },
  { "radical": "歹", "description": "death, decay" },
  { "radical": "殳", "description": "weapon, lance" },
  { "radical": "毋", "description": "do not" },
  { "radical": "比", "description": "compare, compete" },
  { "radical": "毛", "description": "fur, hair" },
  { "radical": "氏", "description": "clan" },
  { "radical": "气", "description": "steam, breath" },
  { "radical": "水", "description": "water" },
  { "radical": "火", "description": "fire" },
  { "radical": "灬", "description": "fire" },
  { "radical": "爪", "description": "claw, nail, talon" },
  { "radical": "父", "description": "father" },
  { "radical": "牛", "description": "cow" },
  { "radical": "犬", "description": "dog" },
  { "radical": "王", "description": "king" },
  { "radical": "礻", "description": "altar, display" },
  { "radical": "耂", "description": "old" },
  { "radical": "勿", "description": "do not" },
  { "radical": "五", "description": "five" },
  { "radical": "巴", "description": "cylinder with a trailing tail" },
  { "radical": "元", "description": "base, origin" },
  { "radical": "井", "description": "well" },
  { "radical": "予", "description": "mineself" },
  { "radical": "屯", "description": "ton" },
  { "radical": "甘", "description": "sweet" },
  { "radical": "生", "description": "life" },
  { "radical": "用", "description": "use" },
  { "radical": "田", "description": "field" },
  { "radical": "疋", "description": "small animal; bolt of cloth" },
  { "radical": "疒", "description": "sickness" },
  { "radical": "癶", "description": "footsteps" },
  { "radical": "白", "description": "white" },
  { "radical": "皮", "description": "skin" },
  { "radical": "皿", "description": "dish" },
  { "radical": "目", "description": "eye" },
  { "radical": "矢", "description": "arrow" },
  { "radical": "石", "description": "stone" },
  { "radical": "示", "description": "altar, display" },
  { "radical": "禾", "description": "grain" },
  { "radical": "穴", "description": "cave" },
  { "radical": "立", "description": "stand, erect" },
  { "radical": "母", "description": "mother" },
  { "radical": "衤", "description": "clothes" },
  { "radical": "罒", "description": "net" },
  { "radical": "世", "description": "society, world; generation" },
  { "radical": "聿", "description": "brush" },
  { "radical": "冊", "description": "(counting) books" },
  { "radical": "而", "description": "rake" },
  { "radical": "竹", "description": "bamboo" },
  { "radical": "米", "description": "rice" },
  { "radical": "糸", "description": "silk" },
  { "radical": "缶", "description": "tin can" },
  { "radical": "羊", "description": "sheep" },
  { "radical": "羽", "description": "feather, wing" },
  { "radical": "耳", "description": "ear" },
  { "radical": "自", "description": "self (nose=self)" },
  { "radical": "至", "description": "arrive" },
  { "radical": "舌", "description": "tongue" },
  { "radical": "舟", "description": "boat" },
  { "radical": "艮", "description": "stopping(?); (good)" },
  { "radical": "虍", "description": "tiger stripes" },
  { "radical": "虫", "description": "insect" },
  { "radical": "血", "description": "blood" },
  { "radical": "行", "description": "go, do" },
  { "radical": "衣", "description": "clothes" },
  { "radical": "西", "description": "west" },
  { "radical": "臣", "description": "minister, official; slave (building a brick wall)" },
  { "radical": "見", "description": "see" },
  { "radical": "角", "description": "horn" },
  { "radical": "言", "description": "speech" },
  { "radical": "谷", "description": "valley" },
  { "radical": "豆", "description": "bean" },
  { "radical": "豕", "description": "pig" },
  { "radical": "貝", "description": "shell" },
  { "radical": "足", "description": "foot" },
  { "radical": "身", "description": "body" },
  { "radical": "車", "description": "cart, car" },
  { "radical": "辛", "description": "spicy, bitter" },
  { "radical": "辰", "description": "dragon; morning" },
  { "radical": "酉", "description": "wine, alcohol" },
  { "radical": "里", "description": "village, mile" },
  { "radical": "赤", "description": "red" },
  { "radical": "走", "description": "race" },
  { "radical": "金", "description": "metal, gold" },
  { "radical": "長", "description": "long, grow; leader" },
  { "radical": "門", "description": "gate" },
  { "radical": "隹", "description": "small bird" },
  { "radical": "雨", "description": "rain" },
  { "radical": "青", "description": "blue, green" },
  { "radical": "岡", "description": "hill" },
  { "radical": "免", "description": "dismissal" },
  { "radical": "斉", "description": "Chinese Qi kingdom" },
  { "radical": "音", "description": "sound" },
  { "radical": "頁", "description": "leaf" },
  { "radical": "食", "description": "eat, food" },
  { "radical": "首", "description": "neck, head" },
  { "radical": "品", "description": "item" },
  { "radical": "馬", "description": "horse" },
  { "radical": "高", "description": "tall, high" },
  { "radical": "啇", "description": "base, stem" },
  { "radical": "無", "description": "nothing" },
  { "radical": "鬼", "description": "daemon" },
  { "radical": "麦", "description": "wheat" },
  { "radical": "屮", "description": "sprout" },
  { "radical": "風", "description": "wind" },
  { "radical": "巨", "description": "gigantic" },
  { "radical": "舛", "description": "dancing" },
  { "radical": "曰", "description": "flat sun" },
  { "radical": "香", "description": "fragrance" },
  { "radical": "鼻", "description": "nose" },
  { "radical": "魚", "description": "fish" },
  { "radical": "尤", "description": "reasonable, just, natural, superb, outstanding, plausible" },
  { "radical": "奄", "description": "cover, suffocate, obstruct" },
  { "radical": "无", "description": "negative" },
  { "radical": "亀", "description": "turtle" },
  { "radical": "髟", "description": "long hair" },
  { "radical": "韋", "description": "tanned leather" },
  { "radical": "支", "description": "branch" },
  { "radical": "非", "description": "wrong" },
  { "radical": "鳥", "description": "bird" },
  { "radical": "玄", "description": "mysterious, occultness, black, deep, profound " },
  { "radical": "彑", "description": "pig's head" },
  { "radical": "瓦", "description": "tile" },
  { "radical": "鹵", "description": "salt" },
  { "radical": "滴", "description": "drip" },
  { "radical": "鼓", "description": "drum" },
  { "radical": "韭", "description": "leek" },
  { "radical": "禸", "description": "track" },
  { "radical": "齊", "description": "even, uniformly" },
  { "radical": "肉", "description": "meat" },
  { "radical": "竜", "description": "dragon" },
  { "radical": "色", "description": "color" },
  { "radical": "骨", "description": "bone" },
  { "radical": "釆", "description": "distinguish" },
  { "radical": "麻", "description": "hemp, flax" },
  { "radical": "久", "description": "long time, old story" },
  { "radical": "龠", "description": "flute" },
  { "radical": "鼠", "description": "mouse" },
  { "radical": "邑", "description": "city" },
  { "radical": "片", "description": "slice" },
  { "radical": "臼", "description": "mortar" },
  { "radical": "黄", "description": "yellow" },
  { "radical": "黍", "description": "millet" },
  { "radical": "鬯", "description": "sacrificial wine" },
  { "radical": "黒", "description": "black" },
  { "radical": "牙", "description": "tooth, fang" },
  { "radical": "瓜", "description": "melon" },
  { "radical": "巛", "description": "river" },
  { "radical": "ユ", "description": "katakana yu" },
  { "radical": "爻", "description": "diagrams for divination" },
  { "radical": "豸", "description": "cat, badger" },
  { "radical": "鬥", "description": "fight" },
  { "radical": "隶", "description": "slave" },
  { "radical": "耒", "description": "plow" },
  { "radical": "革", "description": "leather, rawhide" },
  { "radical": "鹿", "description": "deer" },
  { "radical": "黽", "description": "frog, amphibian" },
  { "radical": "飛", "description": "fly" },
  { "radical": "面", "description": "face" },
  { "radical": "及", "description": "reach out, exert, exercise, cause " },
  { "radical": "鬲", "description": "cauldron, tripod" },
  { "radical": "鼎", "description": "sacrificial tripod, cauldron" },
  { "radical": "黹", "description": "embroidery, needlework" },
  { "radical": "矛", "description": "spear" },
  { "radical": "歯", "description": "tooth" }
]