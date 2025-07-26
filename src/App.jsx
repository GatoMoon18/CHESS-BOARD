import React, { useState } from 'react';
// Importa los componentes visuales de kokopu-react
import { Chessboard, Movetext, NavigationBoard } from 'kokopu-react';
// Importa las clases de lógica de kokopu
import { pgnRead, Game } from 'kokopu';
import './App.css';

function App() {
  const [pgnText, setPgnText] = useState('');
  const [database, setDatabase] = useState(null);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [error, setError] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState('start');

  // Función para manejar la carga de archivos PGN
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setPgnText(content);
        parsePgn(content);
      };
      reader.readAsText(file);
    }
  };

  // Función para manejar texto PGN pegado
  const handlePgnTextChange = (event) => {
    const content = event.target.value;
    setPgnText(content);
    if (content.trim()) {
      parsePgn(content);
    } else {
      setDatabase(null);
      setError(null);
    }
  };

  // Función para parsear PGN
  const parsePgn = (content) => {
    try {
      const parsedDatabase = pgnRead(content);
      setDatabase(parsedDatabase);
      setCurrentGameIndex(0);
      setSelectedNodeId('start');
      setError(null);
    } catch (err) {
      setError(`Error al parsear PGN: ${err.message}`);
      setDatabase(null);
    }
  };

  // Función para obtener información del juego actual
  const getCurrentGame = () => {
    if (!database || database.gameCount() === 0) return null;
    try {
      return database.game(currentGameIndex);
    } catch (err) {
      console.error('Error al obtener juego:', err);
      return null;
    }
  };

  // Función para obtener estadísticas de manera segura
  const getGameStats = (game) => {
    try {
      const mainVariation = game.mainVariation();
      const nodes = mainVariation.nodes();
      
      let commentCount = 0;
      let variationCount = 0;
      
      // Contar comentarios y variaciones
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.comment && node.comment()) {
          commentCount++;
        }
        if (node.variations && node.variations().length > 0) {
          variationCount += node.variations().length;
        }
      }
      
      return {
        totalMoves: nodes.length,
        comments: commentCount,
        variations: variationCount
      };
    } catch (err) {
      console.warn('Error al obtener estadísticas:', err);
      return {
        totalMoves: 0,
        comments: 0,
        variations: 0
      };
    }
  };

  const currentGame = getCurrentGame();
  const stats = currentGame ? getGameStats(currentGame) : null;

  return (
    <div className="App" style={{ 
      fontFamily: 'Georgia, "Times New Roman", serif',
      lineHeight: '1.6',
      color: '#333',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    }}>
      {/* Header elegante */}
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        borderBottom: '2px solid #2c3e50',
        paddingBottom: '20px'
      }}>
        <h1 style={{ 
          fontSize: '2.5em',
          color: '#2c3e50',
          margin: '0',
          fontWeight: 'bold'
        }}>
          Analizador de Partidas de Ajedrez
        </h1>
        <p style={{ 
          fontSize: '1.1em',
          color: '#7f8c8d',
          margin: '10px 0 0 0',
          fontStyle: 'italic'
        }}>
          Análisis profesional de partidas con comentarios detallados
        </p>
      </header>

      {/* Sección de entrada de datos - estilo minimalista */}
      {!database && (
        <div style={{ 
          margin: '40px auto',
          maxWidth: '800px',
          padding: '30px',
          border: '1px solid #ecf0f1',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            color: '#2c3e50',
            marginBottom: '25px',
            textAlign: 'center'
          }}>
            📁 Cargar Partida PGN
          </h2>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block',
              marginBottom: '10px',
              fontWeight: 'bold',
              color: '#34495e'
            }}>
              Seleccionar archivo PGN:
            </label>
            <input
              type="file"
              accept=".pgn"
              onChange={handleFileUpload}
              style={{ 
                width: '100%',
                padding: '12px',
                border: '2px dashed #bdc3c7',
                borderRadius: '6px',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            />
          </div>

          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <span style={{ 
              color: '#7f8c8d',
              fontSize: '1.1em'
            }}>— o —</span>
          </div>

          <div>
            <label style={{ 
              display: 'block',
              marginBottom: '10px',
              fontWeight: 'bold',
              color: '#34495e'
            }}>
              Pegar contenido PGN:
            </label>
            <textarea
              value={pgnText}
              onChange={handlePgnTextChange}
              placeholder="Pega aquí el contenido PGN de tu partida..."
              style={{
                width: '100%',
                height: '200px',
                padding: '15px',
                border: '2px solid #ecf0f1',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '14px',
                resize: 'vertical',
                backgroundColor: '#fff'
              }}
            />
          </div>
        </div>
      )}

      {/* Mostrar errores */}
      {error && (
        <div style={{ 
          color: '#e74c3c',
          margin: '20px auto',
          maxWidth: '800px',
          padding: '15px',
          border: '1px solid #e74c3c',
          borderRadius: '6px',
          backgroundColor: '#fdf2f2'
        }}>
          <strong>⚠️ Error:</strong> {error}
        </div>
      )}

      {/* Mostrar información del juego - estilo Torre Negra */}
      {database && currentGame && (
        <div>
          {/* Navegación entre partidas */}
          {database.gameCount() > 1 && (
            <div style={{ 
              margin: '20px 0',
              padding: '15px',
              backgroundColor: '#ecf0f1',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <span style={{ 
                fontWeight: 'bold',
                color: '#2c3e50',
                marginRight: '20px'
              }}>
                Partida {currentGameIndex + 1} de {database.gameCount()}
              </span>
              <button
                onClick={() => {
                  setCurrentGameIndex(Math.max(0, currentGameIndex - 1));
                  setSelectedNodeId('start');
                }}
                disabled={currentGameIndex === 0}
                style={{ 
                  margin: '0 10px',
                  padding: '8px 16px',
                  border: '1px solid #3498db',
                  borderRadius: '4px',
                  backgroundColor: currentGameIndex === 0 ? '#bdc3c7' : '#3498db',
                  color: 'white',
                  cursor: currentGameIndex === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                ← Anterior
              </button>
              <button
                onClick={() => {
                  setCurrentGameIndex(Math.min(database.gameCount() - 1, currentGameIndex + 1));
                  setSelectedNodeId('start');
                }}
                disabled={currentGameIndex === database.gameCount() - 1}
                style={{ 
                  margin: '0 10px',
                  padding: '8px 16px',
                  border: '1px solid #3498db',
                  borderRadius: '4px',
                  backgroundColor: currentGameIndex === database.gameCount() - 1 ? '#bdc3c7' : '#3498db',
                  color: 'white',
                  cursor: currentGameIndex === database.gameCount() - 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Siguiente →
              </button>
            </div>
          )}

          {/* Información del juego - estilo elegante */}
          <div style={{ 
            margin: '30px 0',
            padding: '25px',
            backgroundColor: '#fff',
            border: '1px solid #ecf0f1',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              color: '#2c3e50',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '1.8em'
            }}>
              📊 Información de la Partida
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                <h3 style={{ 
                  color: '#34495e',
                  borderBottom: '2px solid #3498db',
                  paddingBottom: '10px',
                  marginBottom: '15px'
                }}>
                  👥 Jugadores
                </h3>
                <p><strong>Blancas:</strong> {currentGame.playerName('w') || 'Desconocido'}</p>
                <p><strong>Negras:</strong> {currentGame.playerName('b') || 'Desconocido'}</p>
                <p><strong>Evento:</strong> {currentGame.event() || 'No especificado'}</p>
                <p><strong>Fecha:</strong> {currentGame.date() ? new Date(currentGame.date()).toLocaleDateString() : 'No especificada'}</p>
                <p><strong>Resultado:</strong> {currentGame.result() || 'No especificado'}</p>
              </div>

              <div>
                <h3 style={{ 
                  color: '#34495e',
                  borderBottom: '2px solid #3498db',
                  paddingBottom: '10px',
                  marginBottom: '15px'
                }}>
                  📈 Estadísticas
                </h3>
                <p><strong>Total de movimientos:</strong> {stats?.totalMoves || 0}</p>
                <p><strong>Variaciones:</strong> {stats?.variations || 0}</p>
                <p><strong>Comentarios:</strong> {stats?.comments || 0}</p>
              </div>
            </div>
          </div>

          {/* Layout principal: Tablero a la izquierda, comentarios a la derecha */}
          <div style={{ 
            margin: '40px 0',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            alignItems: 'start'
          }}>
            
            {/* Columna izquierda - Tablero */}
            <div style={{ 
              textAlign: 'center'
            }}>
              <h3 style={{ 
                color: '#2c3e50',
                marginBottom: '20px',
                fontSize: '1.5em'
              }}>
                🎯 Tablero Interactivo
              </h3>
              <div style={{ 
                border: '1px solid #ecf0f1',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                backgroundColor: '#fff'
              }}>
                <NavigationBoard
                  game={currentGame}
                  squareSize={50}
                  pieceset="cburnett"
                  coordinateVisible={true}
                  animated={true}
                  moveArrowVisible={true}
                  turnVisible={true}
                  playButtonVisible={true}
                  flipButtonVisible={true}
                  nodeId={selectedNodeId}
                  onNodeIdChanged={setSelectedNodeId}
                />
              </div>
            </div>

            {/* Columna derecha - Análisis y comentarios con scroll */}
            <div 
              className="chess-analysis-container"
              style={{ 
                backgroundColor: '#fff',
                border: '1px solid #ecf0f1',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                padding: '25px',
                height: 'fit-content',
                maxHeight: '500px',
                overflowY: 'auto'
              }}
            >
              <h3 style={{ 
                color: '#2c3e50',
                marginBottom: '20px',
                fontSize: '1.5em',
                textAlign: 'center'
              }}>
                📝 Análisis de la Partida
              </h3>
              
              {/* Movetext interactivo con sincronización */}
              <div 
                className="chess-movetext-container"
                style={{ 
                  backgroundColor: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '6px',
                  border: '1px solid #e9ecef',
                  marginBottom: '25px'
                }}
              >
                <div style={{ 
                  marginBottom: '10px',
                  padding: '8px 12px',
                  backgroundColor: '#e8f4f8',
                  borderRadius: '4px',
                  border: '1px solid #3498db',
                  fontSize: '0.9em',
                  color: '#2c3e50'
                }}>
                  💡 <strong>Haz clic en cualquier movimiento para navegar en el tablero</strong>
                </div>
                <Movetext
                  game={currentGame}
                  pieceSymbols="figurines"
                  diagramVisible={false}
                  headerVisible={false}
                  interactionMode="selectMove"
                  selection={selectedNodeId}
                  onMoveSelected={(nodeId, evtOrigin) => {
                    console.log('Movimiento seleccionado:', nodeId, 'Origen:', evtOrigin);
                    setSelectedNodeId(nodeId || 'start');
                  }}
                />
              </div>

              {/* Comentarios detallados */}
              <h4 style={{ 
                color: '#2c3e50',
                marginBottom: '15px',
                fontSize: '1.2em',
                textAlign: 'center'
              }}>
                💭 Comentarios de la Partida
              </h4>
              <div style={{ 
                maxHeight: '300px',
                overflowY: 'auto',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #e9ecef'
              }}>
                {(() => {
                  try {
                    const mainVariation = currentGame.mainVariation();
                    const nodes = mainVariation.nodes();
                    
                    return nodes.map((node, index) => (
                      <div key={index} style={{ 
                        margin: '10px 0',
                        padding: '12px',
                        backgroundColor: '#fff',
                        border: '1px solid #e9ecef',
                        borderRadius: '6px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                      }}>
                        <p style={{ 
                          fontWeight: 'bold',
                          color: '#2c3e50',
                          marginBottom: '8px',
                          fontSize: '1em'
                        }}>
                          Movimiento {index + 1}: {node.notation()}
                        </p>
                        {node.comment() && (
                          <p style={{ 
                            margin: '8px 0',
                            padding: '10px',
                            backgroundColor: '#e8f4f8',
                            borderRadius: '4px',
                            fontStyle: 'italic',
                            color: '#2c3e50',
                            borderLeft: '4px solid #3498db',
                            fontSize: '0.9em'
                          }}>
                            💬 {node.comment()}
                          </p>
                        )}
                        {node.variations && node.variations().length > 0 && (
                          <div style={{ 
                            margin: '8px 0',
                            padding: '10px',
                            backgroundColor: '#fff3cd',
                            borderRadius: '4px',
                            border: '1px solid #ffeaa7'
                          }}>
                            <p style={{ 
                              fontWeight: 'bold',
                              color: '#856404',
                              marginBottom: '6px',
                              fontSize: '0.9em'
                            }}>
                              Variaciones:
                            </p>
                            {node.variations().map((variation, varIndex) => (
                              <p key={varIndex} style={{ 
                                margin: '4px 0',
                                padding: '6px',
                                backgroundColor: '#fff',
                                borderRadius: '3px',
                                border: '1px solid #ffeaa7',
                                fontSize: '0.8em'
                              }}>
                                {variation.comment() && `💭 ${variation.comment()} `}
                                {variation.nodes().map(n => n.notation()).join(' ')}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ));
                  } catch (err) {
                    console.error('Error al procesar movimientos:', err);
                    return (
                      <p style={{ 
                        color: '#e74c3c',
                        textAlign: 'center',
                        padding: '20px'
                      }}>
                        Error al procesar los movimientos de la partida.
                      </p>
                    );
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instrucciones - estilo elegante */}
      {!database && !error && (
        <div style={{ 
          margin: '40px auto',
          maxWidth: '800px',
          padding: '30px',
          backgroundColor: '#fff',
          border: '1px solid #ecf0f1',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ 
            color: '#2c3e50',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            📋 Instrucciones de Uso
          </h3>
          <ol style={{ 
            lineHeight: '1.8',
            color: '#34495e'
          }}>
            <li>Sube un archivo PGN (.pgn) o pega el contenido PGN en el área de texto</li>
            <li>El programa analizará automáticamente la partida</li>
            <li>Podrás ver el tablero interactivo, movimientos y comentarios</li>
            <li>Si hay múltiples partidas en el archivo, usa los botones de navegación</li>
          </ol>
          
          <h4 style={{ 
            color: '#2c3e50',
            marginTop: '25px',
            marginBottom: '15px'
          }}>
            📄 Ejemplo de formato PGN:
          </h4>
          <pre style={{ 
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '6px',
            overflowX: 'auto',
            border: '1px solid #e9ecef',
            fontSize: '12px',
            lineHeight: '1.4'
          }}>
{`[Event "Ejemplo de Partida"]
[Site "Ciudad, País"]
[Date "2024.01.01"]
[Round "1"]
[White "Jugador Blanco"]
[Black "Jugador Negro"]
[Result "1-0"]

1.e4 e5 2.Nf3 Nc6 3.Bb5 {Apertura Española} 3...a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 d6 8.c3 O-O 9.h3 Nb8 10.d4 Nbd7 11.Nbd2 Bb7 12.Bc2 Re8 13.Nf1 Bf8 14.Ng3 g6 15.Bg5 h6 16.Bd2 c5 17.d5 c4 18.Nh2 Nc5 19.g3 a5 20.Rg1 Kh7 21.f4 exf4 22.gxf4 f5 23.exf5 gxf5 24.Nhf3 Nfd7 25.Bf4 Nb6 26.Bd6 Bxd6 27.Qxd6 Qf6 28.Qxf6 Nxf6 29.Ne6 Rg8 30.Rxg8 Rxg8 31.Nxc5 dxc5 32.Ne6 Rg6 33.Nxc7 Rg2+ 34.Kf1 Rxb2 35.Ne6 Rb1+ 36.Ke2 Rb2+ 37.Kd1 Rb1+ 38.Kc2 Rb2+ 39.Kc1 Rb1+ 40.Kd2 Rb2+ 41.Ke1 Rb1+ 42.Kf2 Rb2+ 43.Kg3 Rb3+ 44.Kh4 Rb4+ 45.Kh5 Rb5+ 46.Kh4 Rb4+ 47.Kh5 Rb5+ 48.Kh4 Rb4+ 49.Kh5 Rb5+ 50.Kh4 1-0`}
          </pre>
        </div>
      )}

      {/* Footer elegante */}
      <footer style={{ 
        textAlign: 'center',
        marginTop: '60px',
        padding: '20px',
        borderTop: '1px solid #ecf0f1',
        color: '#7f8c8d',
        fontSize: '0.9em'
      }}>
        <p>Analizador de Partidas de Ajedrez - Desarrollado con React y Kokopu</p>
      </footer>
    </div>
  );
}

export default App;