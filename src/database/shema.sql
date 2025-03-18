CREATE DATABASE bilheteria;

CREATE TABLE ingressos (
    id SERIAL PRIMARY KEY,
    evento VARCHAR(255) NOT NULL,
    local VARCHAR(255)  NOT NULL,
    data_evento DATE NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_disponivel INTEGER NOT NULL
);

INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES 
('Show sertanejo- Ana Castela', 'Valinhos, São Paulo', '2025-09-10', 'Pista', 100.00, 500),
('Show sertanejo- Ana Castela', 'Valinhos, São Paulo', '2025-09-10', 'Pista VIP', 200.00, 300),
('Show sertanejo- Ana Castela', 'Valinhos, São Paulo', '2025-09-10', 'Camarote', 300.00, 200),
('Show sertanejo- Ana Castela', 'Valinhos, São Paulo', '2025-09-10', 'Arquibancada', 80.00, 800);