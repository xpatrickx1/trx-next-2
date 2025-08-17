
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { usdtAmount, trxAmount, receiver, rate } = req.body

  if (!usdtAmount || !trxAmount || !rate) {
    return res.status(400).json({ success: false, message: 'Некорректные данные' })
  }

  console.log('Покупка:', { usdtAmount, trxAmount, receiver, rate })

  return res.status(200).json({ success: true, message: 'Покупка успешно принята' })
}
