import { useRef, useState } from "react";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, CheckCircle2, FileImage, FileText, Loader2, LogIn, Trash2, UploadCloud } from "lucide-react";
import { Link } from "wouter";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(mimeType: string) {
  return mimeType.startsWith("image/");
}

export default function Files() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const filesQuery = trpc.files.list.useQuery(undefined, { enabled: isAuthenticated });
  const utils = trpc.useUtils();
  const uploadMutation = trpc.files.upload.useMutation({
    onSuccess: async () => {
      setMessage("Arquivo enviado com segurança para o armazenamento.");
      setErrorMessage(null);
      await utils.files.list.invalidate();
    },
    onError: (error) => {
      setErrorMessage(error.message || "Não foi possível enviar o arquivo.");
      setMessage(null);
    },
  });
  const removeMutation = trpc.files.remove.useMutation({
    onSuccess: async () => {
      setMessage("Arquivo removido da sua galeria.");
      await utils.files.list.invalidate();
    },
    onError: (error) => setErrorMessage(error.message || "Não foi possível remover o arquivo."),
  });

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage("O arquivo precisa ter no máximo 8 MB.");
      return;
    }
    setMessage(null);
    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const dataBase64 = result.split(",")[1];
      if (!dataBase64) {
        setErrorMessage("Não foi possível preparar o arquivo para upload.");
        return;
      }
      uploadMutation.mutate({ fileName: file.name, mimeType: file.type || "application/octet-stream", dataBase64 });
    };
    reader.onerror = () => setErrorMessage("Não foi possível ler o arquivo selecionado.");
    reader.readAsDataURL(file);
  }

  return (
    <main className="files-page">
      <div className="files-shell">
        <header className="files-header">
          <Link href="/" className="files-back"><ArrowLeft size={16} /> Voltar para a vitrine</Link>
          <span className="files-kicker">DIGITALQUINTINO · FULL-STACK</span>
          <h1>Seu espaço de <em>arquivos.</em></h1>
          <p>Envie capas, PDFs e materiais digitais para o armazenamento seguro do projeto. Cada arquivo fica vinculado à sua conta.</p>
        </header>

        {authLoading ? <div className="files-state"><Loader2 className="spin" /> Verificando sua sessão…</div> : !isAuthenticated ? (
          <section className="files-login">
            <LogIn size={28} />
            <h2>Entre para acessar seu armazenamento</h2>
            <p>Faça login para enviar e gerenciar seus arquivos com segurança.</p>
            <button className="files-button files-button-dark" type="button" onClick={() => startLogin()}><LogIn size={16} /> Entrar</button>
          </section>
        ) : (
          <>
            <section className="files-toolbar">
              <div><span className="files-user">{user?.name || user?.email || "Sua conta"}</span><strong>Biblioteca de mídia</strong></div>
              <div className="files-upload-wrap">
                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,application/pdf" onChange={handleFileChange} hidden />
                <button className="files-button files-button-dark" type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadMutation.isPending}><UploadCloud size={16} /> {uploadMutation.isPending ? "Enviando…" : "Enviar arquivo"}</button>
                <small>PDF, JPG, PNG, SVG, WEBP ou GIF · até 8 MB</small>
              </div>
            </section>
            {message && <div className="files-alert files-alert-success"><CheckCircle2 size={16} /> {message}</div>}
            {errorMessage && <div className="files-alert files-alert-error">{errorMessage}</div>}
            {filesQuery.isLoading ? <div className="files-state"><Loader2 className="spin" /> Carregando arquivos…</div> : filesQuery.data?.length ? (
              <div className="files-grid">
                {filesQuery.data.map((file) => (
                  <article className="file-card" key={file.id}>
                    <div className="file-preview">{isImage(file.mimeType) ? <img src={file.fileUrl} alt={file.fileName} /> : <FileText size={38} />}</div>
                    <div className="file-info"><strong title={file.fileName}>{file.fileName}</strong><span>{file.mimeType} · {formatBytes(file.sizeBytes)}</span><a href={file.fileUrl} target="_blank" rel="noreferrer">Abrir arquivo</a></div>
                    <button className="file-remove" type="button" aria-label={`Remover ${file.fileName}`} onClick={() => removeMutation.mutate({ id: file.id })} disabled={removeMutation.isPending}><Trash2 size={15} /></button>
                  </article>
                ))}
              </div>
            ) : <div className="files-empty"><FileImage size={30} /><h2>Seu armazenamento está vazio</h2><p>Envie a primeira imagem ou PDF para começar.</p></div>}
          </>
        )}
      </div>
    </main>
  );
}
