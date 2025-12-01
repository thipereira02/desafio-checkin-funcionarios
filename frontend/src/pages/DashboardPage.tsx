import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, LogOut, History, PlayCircle, StopCircle } from 'lucide-react';
import styled from 'styled-components';
import { BaseCard, BaseButton, PageContainer } from '../components/SharedStyles';

// Estilos Específicos
const DashboardContainer = styled(PageContainer)`
  padding: 1.5rem;
`;

const Header = styled.header`
  max-width: 56rem;
  margin: 0 auto 1.5rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MainGrid = styled.main`
  max-width: 56rem;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
  @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

const ActionCard = styled(BaseCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  min-height: 300px;
`;

// Estendendo o botão base para adicionar cores dinâmicas
const ActionButton = styled(BaseButton)<{ $variant: 'checkin' | 'checkout'; $disabled?: boolean }>`
  max-width: 20rem;
  font-size: 1.125rem;
  
  background-color: ${(props) =>
    props.$disabled
      ? '#e5e7eb'
      : props.$variant === 'checkin'
      ? '#22c55e'
      : '#ef4444'};

  color: ${(props) => (props.$disabled ? '#9ca3af' : 'white')};
  
  &:hover {
    background-color: ${(props) =>
      props.$disabled ? '#e5e7eb' : props.$variant === 'checkin' ? '#16a34a' : '#dc2626'};
  }
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
  font-size: 0.875rem;
  border-collapse: collapse;
  th { padding: 0.75rem; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
  td { padding: 0.75rem; border-bottom: 1px solid #f3f4f6; }
`;

// --- INTERFACES & LOGIC (O código React permanece igual) ---
// (Vou omitir a lógica aqui para não ficar gigante, pode MANTER a lógica do handleCheckIn, etc que já estava)

interface User { id: number; name: string; email: string; }
interface WorkRecord { id: number; checkinTime: string; checkoutTime: string | null; durationInMinutes: number | null; }

export function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [records, setRecords] = useState<WorkRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const fetchRecords = useCallback(async (employeeId: number) => {
    try {
        const response = await axios.get(`${API_URL}/work/list/${employeeId}`);
        setRecords(response.data);
    } catch (error) { console.error(error); }
  }, [API_URL]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) { navigate('/'); return; }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchRecords(parsedUser.id);
  }, [navigate, fetchRecords]);

  async function handleCheckIn() {
    if (!user) return;
    setLoading(true);
    try {
      await axios.post(`${API_URL}/work/checkin?employeeId=${user.id}`);
      await fetchRecords(user.id);
      alert('Check-in realizado!');
    } catch (error: any) { alert(error.response?.data?.error); } finally { setLoading(false); }
  }

  async function handleCheckOut() {
    if (!user) return;
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/work/checkout?employeeId=${user.id}`);
      await fetchRecords(user.id);
      alert(`Check-out realizado! Tempo: ${response.data.durationInMinutes} min.`);
    } catch (error: any) { alert(error.response?.data?.error); } finally { setLoading(false); }
  }

  function handleLogout() { localStorage.removeItem('user'); navigate('/'); }
  function formatDate(d: string | null) { return d ? new Date(d).toLocaleString('pt-BR') : '-'; }
  function formatDuration(m: number | null) { if(m===null) return '-'; return `${Math.floor(m/60)}h ${m%60}m`; }

  const lastRecord = records.length > 0 ? records[0] : null;
  const isWorking = lastRecord && lastRecord.checkoutTime === null;

  return (
    <DashboardContainer>
      <Header>
        <UserInfo>
            <div style={{padding:'0.5rem', background:'#dbeafe', borderRadius:'50%', color:'#2563eb'}}><Clock size={24}/></div>
            <div><h1 style={{fontSize:'1.25rem', fontWeight:'bold'}}>Olá, {user?.name}</h1></div>
        </UserInfo>
        <button onClick={handleLogout} style={{border:'none', background:'none', cursor:'pointer', display:'flex', gap:'0.5rem'}}><LogOut size={20}/> Sair</button>
      </Header>

      <MainGrid>
        <ActionCard>
          <h2>Registrar Ponto</h2>
          <div style={{display:'flex', flexDirection:'column', gap:'1rem', width:'100%', alignItems:'center'}}>
            <ActionButton onClick={handleCheckIn} disabled={loading || !!isWorking} $variant="checkin" $disabled={loading || !!isWorking}>
              <PlayCircle size={24}/> CHECK-IN
            </ActionButton>
            <ActionButton onClick={handleCheckOut} disabled={loading || !isWorking} $variant="checkout" $disabled={loading || !isWorking}>
              <StopCircle size={24}/> CHECK-OUT
            </ActionButton>
          </div>
          <p>Status: <span style={{color: isWorking ? '#16a34a' : '#6b7280', fontWeight:'bold'}}>{isWorking ? 'TRABALHANDO 🟢' : 'FORA ⚪'}</span></p>
        </ActionCard>

        <BaseCard>
          <div style={{display:'flex', gap:'0.5rem', marginBottom:'1rem'}}><History size={20}/><h2>Histórico</h2></div>
          <div style={{overflowY:'auto', maxHeight:'300px'}}>
            <Table>
                <thead><tr><th>Entrada</th><th>Saída</th><th>Duração</th></tr></thead>
                <tbody>
                    {records.map(rec => (
                        <tr key={rec.id}>
                            <td>{formatDate(rec.checkinTime)}</td>
                            <td>{formatDate(rec.checkoutTime)}</td>
                            <td style={{color:'#2563eb', fontWeight:600}}>{rec.durationInMinutes !== null ? formatDuration(rec.durationInMinutes) : '...'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
          </div>
        </BaseCard>
      </MainGrid>
    </DashboardContainer>
  );
}