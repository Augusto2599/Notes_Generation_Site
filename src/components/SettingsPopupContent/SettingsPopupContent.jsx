import React from 'react';
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

function SettingsPopupContent() {
    // Exemplo de estado para os toggles
    const [isProfilePrivate, setProfilePrivate] = React.useState(false);
    const [areNotesPublic, setNotesPublic] = React.useState(true);

    return (
        <div className="settings-container">
            {/* LADO ESQUERDO */}
            <div className="settings-column settings-left">
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" defaultValue="Usuário Exemplo" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" defaultValue="usuario@exemplo.com" />
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
                        isEnabled={isProfilePrivate}
                        onToggle={() => setProfilePrivate(!isProfilePrivate)}
                    />
                    <ToggleSwitch
                        label="Mostrar notas na comunidade"
                        isEnabled={areNotesPublic}
                        onToggle={() => setNotesPublic(!areNotesPublic)}
                    />
                </div>
            </div>

            {/* LADO DIREITO */}
            <div className="settings-column settings-right">
                <div className="user-avatar-large">U</div>
                <div className="user-nickname">Usuário Exemplo</div>
                <div className="user-info-id">ID: #123456</div>
                <div className="account-type-badge premium">Premium</div>

                <div className="action-buttons">
                    <button className="btn btn-save">Salvar Alterações</button>
                    <button className="btn btn-delete">Deletar Conta</button>
                </div>
            </div>
        </div>
    );
}

export default SettingsPopupContent;