/**
 * Google SpreadSheet getting Script
 * Copyright © HyodaKazuaki
 */

const path = require('path')
const fs = require('fs')
const axios = require('axios')

/**
 * データ取得先
 */
const URI = 'https://script.googleusercontent.com/macros/echo?user_content_key=PYdskn-DTyGWV-opQBIPMai2hf_fFAN4QEmRbzTslY_Wk87YfJO9j9H3ity-FUaFPy1pksmbx2n_xtdxmYsKNAQ8OsCGB2Tbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIEfRmCr39HTGQrTUSiWR0O7CYjXcSKXdkQgDZghk6tW42sA2IpyDGOwsQ9LRFT_DlHTmz_2mixm&lib=MA39SnUYxoNd8lbNHqVdiBtdTRtZCTy75'

/**
 * jsonファイルの階層
 */
const dir = '../data/'

/**
 * 各種jsonファイルの名前
 */
const files = {
  inspection_summary: 'inspection_summary.json', // 検査陽性者の状況
  inspection_persons: 'inspection_persons.json', // 検査実施人数
  patients_summary: 'patients_summary.json', // 陽性患者数
  patients: 'patients.json', // 陽性患者の属性
  hospital_beds: 'hospital_beds.json', // 感染症病床使用率
  breaking_news: 'breaking_news.json', // 速報
  fukui_news: 'fukui_news.json', // 県内のお知らせ
  japan_news: 'japan_news.json' // 国内のお知らせ
}

axios
  .get(URI)
  .then(function(response) {
    const json = response.data
    for (const [name, fileName] of Object.entries(files)) {
      const filePath = path.join(dir, fileName)
      fs.writeFile(filePath, JSON.stringify(json[name], null, '    '), err => {
        if (err) console.error(err)
      })
    }
  })
  .catch(err => {
    console.error(err)
  })
