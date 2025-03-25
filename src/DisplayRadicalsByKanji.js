import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

export default function DisplayRadicalsByKanji() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [kanji, setKanji] = useState('')
  const [radicalsForThisKanji, setRadicalsForThisKanji] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const textBoxRef = React.createRef()

  const onShow = () => {
    textBoxRef.current.focus()
  }

  useEffect(() => {
    if (!kanji)
      setRadicalsForThisKanji([])
    else {
      // TODO: Understand if it's really needed to put this function in a variable
      const fetchRadicals = async () => {
        try {
          const response = await fetch(`https://janus1.iccan.us/japanese-api/radical-by-kanji/${kanji[0]}`)
          const responseData = await response.json()
          setRadicalsForThisKanji(responseData || [])
          setFetchError(null)
        } catch (error) {
          setFetchError(error)
        }
      }
      fetchRadicals()
    }
  }, [kanji])

  return (
    <>
      <Button size="sm" variant="outline-secondary" onClick={() => setIsModalVisible(true)}>部首検索</Button>
      <Modal show={isModalVisible} onHide={() => setIsModalVisible(false)} onShow={onShow} >
        <Modal.Header closeButton>
          <Modal.Title>部首検索</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="漢字を入力して下さい"
            ref={textBoxRef}
            value={kanji}
            style={{ marginBottom: '10px' }}
            onChange={(e) => setKanji(e.target.value)}
          />
          {fetchError && <div style={{ color: 'red', marginBottom: '10px' }}>エラー: {fetchError.message}</div>}
          {!fetchError && (
            <>
              <ul>
                {radicalsForThisKanji.map((radical) => (
                  <li key={radical}>{radical}</li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}