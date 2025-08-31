import React, { useState, useRef } from 'react';
import './SettingsPopupContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple, faFacebookF } from '@fortawesome/free-brands-svg-icons';


// Componente para o Toggle Switch
function ToggleSwitch({ label, isEnabled, onToggle }) {
    return (
        <div className="toggle-switch-container">
            <label className="toggle-switch">
                <input type="checkbox" checked={isEnabled} onChange={onToggle} />
                <span className="slider"></span>
            </label>
            <span>{label}</span>
        </div>
    );
}

function SettingsPopupContent({ currentSettings, onSave }) {
    const [settings, setSettings] = useState(currentSettings);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleChange = (name) => {
        setSettings(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Converte a imagem para Data URL (Base64) para salvar no localStorage
                setSettings(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {
            alert("Por favor, selecione um arquivo de imagem (JPEG ou PNG).");
        }
    };

    // A função de salvar agora chama a prop 'onSave' vinda da SideBar
    const handleSave = () => {
        onSave(settings);
    };

    return (
        <div className="settings-container">
            {/* LADO ESQUERDO */}
            <div className="settings-column settings-left">
                <div className="form-group">
                    <label htmlFor="name">Nome Completo</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={settings.name}
                        onChange={handleInputChange}
                        placeholder="Digite seu nome completo"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={settings.email}
                        onChange={handleInputChange}
                        placeholder="seuemail@exemplo.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Nova Senha</label>
                    <input type="password" id="password" placeholder="Deixe em branco para não alterar" />
                </div>
                <div className="form-group">
                    <label htmlFor="password-confirm">Repita a Senha</label>
                    <input type="password" id="password-confirm" placeholder="Confirme a nova senha" />
                </div>

                <div className="social-connections">
                    <span>Conta conectada com:</span>
                    <div className="social-icons">
                        <FontAwesomeIcon icon={faGoogle} className="social-icon connected" title="Conectado com Google" />
                        <FontAwesomeIcon icon={faApple} className="social-icon" title="Conectar com Apple" />
                        <FontAwesomeIcon icon={faFacebookF} className="social-icon" title="Conectar com Facebook" />
                    </div>
                </div>
                <div className="settings-toggles">
                    <ToggleSwitch
                        label="Perfil Privado"
                        isEnabled={settings.isProfilePrivate}
                        onToggle={() => handleToggleChange('isProfilePrivate')}
                    />
                    <ToggleSwitch
                        label="Mostrar notas na comunidade"
                        isEnabled={settings.areNotesPublic}
                        onToggle={() => handleToggleChange('areNotesPublic')}
                    />
                </div>
            </div>

            {/* LADO DIREITO */}
            <div className="settings-column settings-right">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                    accept="image/png, image/jpeg"
                />
                <div
                    className="user-avatar-large"
                    onClick={handleAvatarClick}
                    style={{ backgroundImage: `url(${settings.avatar})`, backgroundSize: 'cover' }}
                >
                    {!settings.avatar && settings.nickname.charAt(0).toUpperCase()}
                </div>
                <div className="form-group">
                    <label htmlFor="nickname">Nickname</label>
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        className="nickname-input"
                        value={settings.nickname}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="user-info-id">ID: #123456</div>
                <div className="account-type-badge premium">Premium</div>

                <div className="action-buttons">
                    <button className="btn btn-save" onClick={handleSave}>Salvar Alterações</button>
                    <button className="btn btn-delete">Deletar Conta</button>
                </div>
            </div>
        </div>
    );
}

export default SettingsPopupContent;