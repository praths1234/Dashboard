import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Rnd } from 'react-rnd';
import ReactQuill from 'react-quill';
import * as html2canvas from 'html2canvas';
import 'react-quill/dist/quill.snow.css';

const Customizer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const uId = JSON.parse(localStorage.getItem('user')).data._id;
  const [product, setProduct] = useState(null);
  const [color, setColor] = useState('#FFFFFF');
  const [size, setSize] = useState('XS');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0, width: 200, height: 100 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const previewRef = useRef();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveText = () => {
    setText('');
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let customizedImage = null;

    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current, { useCORS: true });
      customizedImage = canvas.toDataURL('image/jpeg', 0.95);
    }

    const formData = new FormData();
    formData.append('userId', uId);
    formData.append('productId', id);
    formData.append('text', text);
    formData.append('color', color);
    formData.append('size', size);
    formData.append('image', image);
    formData.append('textPosition', JSON.stringify(textPosition));
    formData.append('imagePosition', JSON.stringify(imagePosition));
    formData.append('customizedImage', customizedImage);
    formData.append('price', product.price);
    try {
      const response = await axios.post('http://localhost:4000/designs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      navigate(`/updatedProduct/${response.data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {product && (
        <>
          <h1>Customize {product.name}</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Color:</label>
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <div>
              <label>Size:</label>
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="3XL">3XL</option>
                <option value="4XL">4XL</option>
              </select>
            </div>
            <div>
              <label>Text:</label>
              <ReactQuill
                value={text}
                onChange={setText}
                modules={{
                  toolbar: [
                    [{ 'font': [] }, { 'size': [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    ['link', 'image', 'video'],
                    ['clean']
                  ],
                }}
                formats={[
                  'font', 'size',
                  'bold', 'italic', 'underline', 'strike',
                  'color', 'background',
                  'script',
                  'link', 'image', 'video'
                ]}
              />
              {text && (
                <button type="button" onClick={handleRemoveText}>
                  Remove Text
                </button>
              )}
            </div>
            <div>
              <label>Image:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {preview && (
                <button type="button" onClick={handleRemoveImage}>
                  Remove Image
                </button>
              )}
            </div>
            <button type="submit">Save Customization</button>
          </form>
          <div>
            <h2>Preview</h2>
            <div
              ref={previewRef}
              style={{
                position: 'relative',
                width: '400px',
                height: '600px',
                background: `url(${product.imageUrl}) center center / contain no-repeat`,
                backgroundColor: color,
                border: '1px solid #ccc',
                margin: '0 auto'
              }}
            >
              {text && (
                <Rnd
                  bounds="parent"
                  size={{ width: textPosition.width, height: textPosition.height }}
                  position={{ x: textPosition.x, y: textPosition.y }}
                  onDragStop={(e, d) => setTextPosition({ ...textPosition, x: d.x, y: d.y })}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    setTextPosition({
                      width: ref.offsetWidth,
                      height: ref.offsetHeight,
                      ...position
                    });
                  }}
                  resizeHandleStyles={{
                    top: { cursor: 'ns-resize' },
                    right: { cursor: 'ew-resize' },
                    bottom: { cursor: 'ns-resize' },
                    left: { cursor: 'ew-resize' },
                    topRight: { cursor: 'ne-resize' },
                    bottomRight: { cursor: 'se-resize' },
                    bottomLeft: { cursor: 'sw-resize' },
                    topLeft: { cursor: 'nw-resize' },
                  }}
                  resizeHandles={['top', 'right', 'bottom', 'left', 'topRight', 'bottomRight', 'bottomLeft', 'topLeft']}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      padding: '5px',
                      background: 'rgba(255, 255, 255, 0.7)',
                      cursor: 'move',
                      userSelect: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                </Rnd>
              )}
              {preview && (
                <Rnd
                  bounds="parent"
                  size={{ width: imagePosition.width, height: imagePosition.height }}
                  position={{ x: imagePosition.x, y: imagePosition.y }}
                  onDragStop={(e, d) => setImagePosition({ ...imagePosition, x: d.x, y: d.y })}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    setImagePosition({
                      width: ref.offsetWidth,
                      height: ref.offsetHeight,
                      ...position
                    });
                  }}
                  resizeHandleStyles={{
                    top: { top: '-5px', left: '50%', cursor: 'ns-resize', transform: 'translate(-50%, -50%)' },
                    right: { right: '-5px', top: '50%', cursor: 'ew-resize', transform: 'translate(50%, -50%)' },
                    bottom: { bottom: '-5px', left: '50%', cursor: 'ns-resize', transform: 'translate(-50%, 50%)' },
                    left: { left: '-5px', top: '50%', cursor: 'ew-resize', transform: 'translate(-50%, -50%)' },
                    topRight: { top: '-5px', right: '-5px', cursor: 'ne-resize', transform: 'translate(50%, -50%)' },
                    bottomRight: { bottom: '-5px', right: '-5px', cursor: 'se-resize', transform: 'translate(50%, 50%)' },
                    bottomLeft: { bottom: '-5px', left: '-5px', cursor: 'sw-resize', transform: 'translate(-50%, 50%)' },
                    topLeft: { top: '-5px', left: '-5px', cursor: 'nw-resize', transform: 'translate(-50%, -50%)' },
                  }}
                  resizeHandles={['top', 'right', 'bottom', 'left', 'topRight', 'bottomRight', 'bottomLeft', 'topLeft']}
                >
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </Rnd>
              )}
            </div>
          </div>
          <div>
            <h2>Text Position:</h2>
            <pre>{JSON.stringify(textPosition)}</pre>
            <h2>Image Position:</h2>
            <pre>{JSON.stringify(imagePosition)}</pre>
          </div>
        </>
      )}
    </div>
  );
};

export default Customizer;
