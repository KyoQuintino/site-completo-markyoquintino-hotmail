# Armazenamento de arquivos

O projeto agora usa o armazenamento S3 gerenciado pelo WebDev por meio de `server/storage.ts`. Os bytes dos arquivos ficam no storage; o banco guarda apenas metadados e a referência `/manus-storage/...`.

## Fluxo

A rota `/arquivos` apresenta uma área autenticada para a conta atual. O usuário seleciona um PDF ou imagem, o cliente converte o arquivo para Base64 e chama o procedimento protegido `files.upload`. O servidor valida o tipo e o limite de 8 MB, grava o objeto com `storagePut()` em uma chave com escopo do usuário e persiste nome, MIME, tamanho, chave e URL na tabela `stored_files`.

A listagem usa `files.list` e retorna somente os arquivos do usuário autenticado. A remoção usa `files.remove` e elimina o registro de metadados; como o helper de storage não expõe uma operação de delete, o objeto sem referência deixa de ser alcançável pela aplicação.

## Tipos aceitos

São aceitos `PDF`, `JPG`, `PNG`, `SVG`, `WEBP` e `GIF`, com tamanho máximo de **8 MB** por arquivo. O controle de proprietário é aplicado no procedimento e também na consulta ao banco.

## Arquivos principais

| Arquivo | Responsabilidade |
|---|---|
| `server/storage.ts` | Upload e referências do storage S3 gerenciado |
| `server/routers.ts` | Procedimentos protegidos de upload, listagem e remoção |
| `server/db.ts` | Queries dos metadados e verificação de proprietário |
| `drizzle/schema.ts` | Tabela `stored_files` vinculada a `users` |
| `client/src/pages/Files.tsx` | Interface de login, upload e galeria |
| `client/src/App.tsx` | Rota `/arquivos` |

A migração SQL foi gerada em `drizzle/0000_fat_edwin_jarvis.sql` e aplicada ao banco gerenciado. O próximo passo natural é adicionar pastas, tags ou associação de arquivos a produtos da vitrine, caso necessário.
