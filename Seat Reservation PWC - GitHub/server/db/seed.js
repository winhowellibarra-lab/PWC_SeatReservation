const ZONES = [
  { id: 1, name: 'Oracle', color: '#83CCEB', description: 'Oracle practice team' },
  { id: 2, name: 'MS', color: '#4D93D9', description: 'Microsoft practice team' },
  { id: 3, name: 'SAP and CEDA AU', color: '#F2CEEF', description: 'SAP and CEDA Australia team' },
  { id: 4, name: 'CEDA US', color: '#CAEDFA', description: 'CEDA US team' },
  { id: 5, name: 'Salesforce', color: '#FF6B6B', description: 'Salesforce practice team' },
  { id: 6, name: 'Guidewire/BSCO', color: '#B5E6A2', description: 'Guidewire and BSCO teams' },
  { id: 7, name: 'CDTR - Cyber MS', color: '#FFC000', description: 'Cyber and Digital Trust team' },
  { id: 8, name: 'R&R / ERCS', color: '#782170', description: 'Risk & Regulatory / ERCS team' },
  { id: 9, name: 'Risk and Quality', color: '#BE5014', description: 'Risk and Quality team' },
  { id: 10, name: 'Shared Services', color: '#FFD700', description: 'Shared Services team' },
];

const ZONE_BOUNDS = {
  1:  { x: 40,   y: 60, w: 440, h: 560 },  // Oracle
  3:  { x: 520,  y: 60, w: 640, h: 560 },  // SAP and CEDA AU
  5:  { x: 1200, y: 60, w: 340, h: 560 },  // Salesforce
  7:  { x: 1580, y: 60, w: 340, h: 560 },  // CDTR - Cyber MS
  8:  { x: 1960, y: 60, w: 340, h: 560 },  // R&R / ERCS
  9:  { x: 2340, y: 60, w: 340, h: 560 },  // Risk and Quality
  2:  { x: 2720, y: 60, w: 440, h: 560 },  // MS
  4:  { x: 3200, y: 60, w: 320, h: 560 },  // CEDA US
  10: { x: 3560, y: 60, w: 360, h: 560 },  // Shared Services
  6:  { x: 3960, y: 60, w: 560, h: 560 },  // Guidewire/BSCO
};

const ROOMS = [
  { room_number: '11063', name: 'Boardroom', capacity: 21, room_type: 'conference', x: 30, y: 20, width: 130, height: 60 },
  { room_number: '11061', name: 'Open Collab 2', capacity: null, room_type: 'collaboration', x: 170, y: 20, width: 100, height: 60 },
  { room_number: '11062', name: 'Team Room 2', capacity: 9, room_type: 'team', x: 280, y: 20, width: 90, height: 60 },
  { room_number: '11064', name: 'Training Room A', capacity: 28, room_type: 'training', x: 380, y: 20, width: 110, height: 60 },
  { room_number: '11065', name: 'Training Room B', capacity: 30, room_type: 'training', x: 380, y: 90, width: 110, height: 50 },
  { room_number: '11060', name: 'Team Room 3', capacity: 20, room_type: 'team', x: 280, y: 90, width: 90, height: 50 },
  { room_number: '11001', name: 'Open Collab 1', capacity: null, room_type: 'collaboration', x: 500, y: 20, width: 100, height: 60 },
  { room_number: '11000', name: 'Reception', capacity: null, room_type: 'facility', x: 500, y: 90, width: 100, height: 50 },
  { room_number: '11054', name: 'Team Room 1', capacity: 8, room_type: 'team', x: 170, y: 90, width: 100, height: 50 },
  { room_number: '11058', name: 'Team Room 4', capacity: 8, room_type: 'team', x: 30, y: 90, width: 130, height: 50 },
  { room_number: '11057', name: 'Conference Room 3', capacity: 11, room_type: 'conference', x: 30, y: 160, width: 130, height: 45 },
  { room_number: '11013', name: 'Conference Room 1', capacity: 7, room_type: 'conference', x: 930, y: 160, width: 100, height: 45 },
  { room_number: '11014', name: 'Conference Room 2', capacity: 4, room_type: 'conference', x: 1040, y: 160, width: 80, height: 45 },
  { room_number: '11010', name: 'Amphitheater', capacity: null, room_type: 'facility', x: 820, y: 20, width: 130, height: 60 },
  { room_number: '11011', name: 'Multi-Function Hall', capacity: null, room_type: 'facility', x: 820, y: 90, width: 130, height: 60 },
  { room_number: null, name: 'Pantry', capacity: null, room_type: 'facility', x: 960, y: 20, width: 80, height: 60 },
  { room_number: null, name: 'Project Room 1', capacity: 22, room_type: 'project', x: 610, y: 20, width: 90, height: 60 },
  { room_number: null, name: 'Project Room 2', capacity: 22, room_type: 'project', x: 710, y: 20, width: 90, height: 60 },
  { room_number: null, name: 'Project Room 3', capacity: 23, room_type: 'project', x: 820, y: 160, width: 100, height: 45 },
  { room_number: null, name: 'Flexible Project Room', capacity: 50, room_type: 'project', x: 1000, y: 280, width: 170, height: 350 },
  { room_number: '11055', name: 'Enclosed WS 1', capacity: 1, room_type: 'enclosed', x: 170, y: 160, width: 80, height: 35 },
  { room_number: '11051', name: 'Enclosed WS 2', capacity: 1, room_type: 'enclosed', x: 170, y: 200, width: 80, height: 35 },
  { room_number: null, name: 'Phonebooth 1', capacity: 1, room_type: 'facility', x: 260, y: 160, width: 55, height: 35 },
  { room_number: null, name: 'Phonebooth 2', capacity: 1, room_type: 'facility', x: 260, y: 200, width: 55, height: 35 },
];

const WORKSTATION_AREAS = [
  { id: 1, name: 'Workstation 1', area_type: 'workstation', zone_id: 3, total_seats: 88 },
  { id: 2, name: 'Workstation 2', area_type: 'workstation', zone_id: 1, total_seats: 33 },
  { id: 3, name: 'Workstation 3', area_type: 'workstation', zone_id: 5, total_seats: 18 },
  { id: 4, name: 'Team Table', area_type: 'team_table', zone_id: 3, total_seats: 64 },
  { id: 5, name: 'Workbar 1', area_type: 'workbar', zone_id: 2, total_seats: 8 },
  { id: 6, name: 'Workbar 2', area_type: 'workbar', zone_id: 2, total_seats: 8 },
  { id: 7, name: 'Workbar 3', area_type: 'workbar', zone_id: 10, total_seats: 8 },
  { id: 8, name: 'Workbar 4', area_type: 'workbar', zone_id: 6, total_seats: 48 },
  { id: 9, name: 'Workbar 5', area_type: 'workbar', zone_id: 4, total_seats: 8 },
  { id: 10, name: 'Workbar 6', area_type: 'workbar', zone_id: 1, total_seats: 6 },
];

function generateClusterSeats(zoneBounds, totalSeats, clusterSize, areaPrefix, areaId, zoneId) {
  const seats = [];
  const numClusters = Math.ceil(totalSeats / clusterSize);
  const cols = Math.ceil(Math.sqrt(numClusters));
  const rows = Math.ceil(numClusters / cols);

  const padding = 30;
  const availW = zoneBounds.w - padding * 2;
  const availH = zoneBounds.h - padding * 2;
  const clusterW = availW / cols;
  const clusterH = availH / rows;

  let seatNum = 1;
  for (let row = 0; row < rows && seatNum <= totalSeats; row++) {
    for (let col = 0; col < cols && seatNum <= totalSeats; col++) {
      const clusterX = zoneBounds.x + padding + col * clusterW;
      const clusterY = zoneBounds.y + padding + row * clusterH;
      const clusterLabel = String.fromCharCode(65 + row * cols + col);

      const seatCols = Math.ceil(clusterSize / 2);
      const seatRows = 2;
      const seatSpacingX = 28;
      const seatSpacingY = 28;

      for (let sr = 0; sr < seatRows && seatNum <= totalSeats; sr++) {
        for (let sc = 0; sc < seatCols && seatNum <= totalSeats; sc++) {
          seats.push({
            seat_label: `${areaPrefix}-${clusterLabel}${seatNum % clusterSize || clusterSize}`,
            workstation_area_id: areaId,
            zone_id: zoneId,
            has_monitor: seatNum <= Math.floor(totalSeats * 0.7) ? 1 : 0,
            x: Math.round(clusterX + sc * seatSpacingX + 14),
            y: Math.round(clusterY + sr * seatSpacingY + 14),
          });
          seatNum++;
        }
      }
    }
  }
  return seats;
}

function generateWorkbarSeats(startX, startY, count, areaPrefix, areaId, zoneId, layout = 'horizontal') {
  const seats = [];
  const spacing = 28;

  for (let i = 0; i < count; i++) {
    seats.push({
      seat_label: `${areaPrefix}-${i + 1}`,
      workstation_area_id: areaId,
      zone_id: zoneId,
      has_monitor: 0,
      x: layout === 'vertical'
        ? startX + Math.floor(i / 4) * spacing
        : layout === '4x2'
          ? startX + (i % 4) * spacing
          : startX + i * spacing,
      y: layout === 'vertical'
        ? startY + (i % 4) * spacing
        : layout === '4x2'
          ? startY + Math.floor(i / 4) * spacing
          : startY,
    });
  }

  return seats;
}

function generateTeamTableSeats(zoneBounds, totalSeats, areaId, zoneId) {
  const seats = [];
  const cols = 8;
  const rows = Math.ceil(totalSeats / cols);
  const padding = 20;
  const spacingX = 28;
  const spacingY = 28;

  let num = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols && num <= totalSeats; c++) {
      seats.push({
        seat_label: `TT-${num}`,
        workstation_area_id: areaId,
        zone_id: zoneId,
        has_monitor: 1,
        x: Math.round(zoneBounds.x + padding + c * spacingX + 14),
        y: Math.round(zoneBounds.y + padding + r * spacingY + 14),
      });
      num++;
    }
  }
  return seats;
}

export function seedAll(db) {
  const insertZone = db.prepare('INSERT INTO zones (id, name, color, description) VALUES (?, ?, ?, ?)');
  const insertRoom = db.prepare('INSERT INTO rooms (room_number, name, capacity, room_type, x, y, width, height) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  const insertArea = db.prepare('INSERT INTO workstation_areas (id, name, area_type, zone_id, total_seats) VALUES (?, ?, ?, ?, ?)');
  const insertSeat = db.prepare('INSERT INTO seats (seat_label, workstation_area_id, zone_id, has_monitor, x, y) VALUES (?, ?, ?, ?, ?, ?)');

  const transaction = db.transaction(() => {
    for (const z of ZONES) {
      insertZone.run(z.id, z.name, z.color, z.description);
    }

    for (const r of ROOMS) {
      insertRoom.run(r.room_number, r.name, r.capacity, r.room_type, r.x, r.y, r.width, r.height);
    }

    for (const a of WORKSTATION_AREAS) {
      insertArea.run(a.id, a.name, a.area_type, a.zone_id, a.total_seats);
    }

    // Workstation 1: 88 seats in the upper section of SAP zone
    const sapBounds = ZONE_BOUNDS[3];
    const ws1Bounds = { x: sapBounds.x, y: sapBounds.y, w: sapBounds.w, h: 340 };
    const ws1Seats = generateClusterSeats(ws1Bounds, 88, 8, 'WS1', 1, 3);
    for (const s of ws1Seats) {
      insertSeat.run(s.seat_label, s.workstation_area_id, s.zone_id, s.has_monitor, s.x, s.y);
    }

    // Team Table: 64 seats in the lower section of SAP zone
    // const ttBounds = { x: sapBounds.x, y: sapBounds.y + 340, w: sapBounds.w, h: 100 };
    // const ttSeats = generateTeamTableSeats(ttBounds, 64, 4, 3);
    // for (const s of ttSeats) {
    //   insertSeat.run(s.seat_label, s.workstation_area_id, s.zone_id, s.has_monitor, s.x, s.y);
    // }

    // Workstation 2: 33 seats in the upper section of Oracle
    const oracleBounds = ZONE_BOUNDS[1];
    const ws2Bounds = { x: oracleBounds.x, y: oracleBounds.y, w: oracleBounds.w, h: 400 };
    const ws2Seats = generateClusterSeats(ws2Bounds, 33, 8, 'WS2', 2, 1);
    for (const s of ws2Seats) {
      insertSeat.run(s.seat_label, s.workstation_area_id, s.zone_id, s.has_monitor, s.x, s.y);
    }

    // Workbar 6: 6 seats in the lower section of Oracle
    const wb6 = generateWorkbarSeats(oracleBounds.x + 30, oracleBounds.y + 480, 6, 'WB6', 10, 1);
    for (const s of wb6) insertSeat.run(s.seat_label, s.workstation_area_id, s.zone_id, s.has_monitor, s.x, s.y);

    // Workstation 3: 18 seats in Salesforce
    const ws3Seats = generateClusterSeats(ZONE_BOUNDS[5], 18, 6, 'WS3', 3, 5);
    for (const s of ws3Seats) {
      insertSeat.run(s.seat_label, s.workstation_area_id, s.zone_id, s.has_monitor, s.x, s.y);
    }

    // Workbar 1 and 2: MS seats
    const msBounds = ZONE_BOUNDS[2];
    const wb1 = generateWorkbarSeats(msBounds.x + 30, msBounds.y + 200, 8, 'WB1', 5, 2);
    for (const s of wb1) insertSeat.run(s.seat_label, s.workstation_area_id, s.zone_id, s.has_monitor, s.x, s.y);

    const wb2 = generateWorkbarSeats(msBounds.x + 30, msBounds.y + 300, 8, 'WB2', 6, 2);
    for (const s of wb2) insertSeat.run(s.seat_label, s.workstation_area_id, s.zone_id, s.has_monitor, s.x, s.y);

    // Workbar 5: 8 seats in CEDA US
    const cedaBounds = ZONE_BOUNDS[4];
    const wb5 = generateWorkbarSeats(cedaBounds.x + 30, cedaBounds.y + 250, 8, 'WB5', 9, 4);
    for (const s of wb5) insertSeat.run(s.seat_label, s.workstation_area_id, s.zone_id, s.has_monitor, s.x, s.y);

    // Shared Services: 27 clustered seats plus Workbar 3
    const sharedBounds = ZONE_BOUNDS[10];
    const sharedClusterBounds = { x: sharedBounds.x, y: sharedBounds.y, w: sharedBounds.w, h: 400 };
    const ssSeats = generateClusterSeats(sharedClusterBounds, 27, 8, 'SS', 7, 10);
    for (const s of ssSeats) insertSeat.run(s.seat_label, s.workstation_area_id, s.zone_id, s.has_monitor, s.x, s.y);

    const wb3 = generateWorkbarSeats(sharedBounds.x + 30, sharedBounds.y + 480, 8, 'WB3', 7, 10);
    for (const s of wb3) insertSeat.run(s.seat_label, s.workstation_area_id, s.zone_id, s.has_monitor, s.x, s.y);

    // Guidewire/BSCO: 48 seats matching reference layout
    // Top section: 4 clusters of 8 in 2col x 4row (numbers: 1-4 left col, 5-8 right col)
    // Middle section: 1 cluster of 8 in 4col x 2row (top: 5-8, bottom: 1-4)
    // Bottom section: 1 row of 8 horizontal
    const gw = ZONE_BOUNDS[6];
    const gwSeats = [];
    const gwSpX = 30; // spacing X between seats
    const gwSpY = 30; // spacing Y between seats

    function make2x4Cluster(startX, startY, prefix) {
      const cluster = [];
      for (let row = 0; row < 4; row++) {
        cluster.push({ seat_label: `${prefix}-${row + 1}`, x: startX, y: startY + row * gwSpY });
        cluster.push({ seat_label: `${prefix}-${row + 5}`, x: startX + gwSpX, y: startY + row * gwSpY });
      }
      return cluster;
    }

    // Top-left pair: two 2x4 clusters side by side
    const topY = gw.y + 40;
    const clusterGap = 110;

    gwSeats.push(...make2x4Cluster(gw.x + 30, topY, 'GW-A'));
    gwSeats.push(...make2x4Cluster(gw.x + 30 + clusterGap, topY, 'GW-B'));
    gwSeats.push(...make2x4Cluster(gw.x + 30 + clusterGap * 2, topY, 'GW-C'));
    gwSeats.push(...make2x4Cluster(gw.x + 30 + clusterGap * 3, topY, 'GW-D'));
    

    // Middle: 4col x 2row
    // Top row: 1,2,3,4
    // Bottom row: 5,6,7,8
    const midX = gw.x + 180;
    const midY = gw.y + 300;

    for (let c = 0; c < 4; c++) {
      // Top row
      gwSeats.push({
        seat_label: `GW-E-${c + 1}`,
        x: midX + c * gwSpX,
        y: midY,
      });

      // Bottom row
      gwSeats.push({
        seat_label: `GW-E-${c + 5}`,
        x: midX + c * gwSpX,
        y: midY + gwSpY,
      });
    }

    // Bottom: horizontal row of 8
    const botX = gw.x + 240;
    const botY = gw.y + 470;
    for (let i = 0; i < 8; i++) {
      gwSeats.push({ seat_label: `GW-F-${i + 1}`, x: botX + i * gwSpX, y: botY });
    }

    for (const s of gwSeats) {
      insertSeat.run(s.seat_label, 8, 6, 0, s.x, s.y);
    }

    // CDTR - Cyber MS, R&R / ERCS, Risk and Quality
    const cyberSeats = generateClusterSeats(ZONE_BOUNDS[7], 24, 8, 'CY', 1, 7);
    for (const s of cyberSeats) insertSeat.run(s.seat_label, s.workstation_area_id, s.zone_id, s.has_monitor, s.x, s.y);

    const rrSeats = generateClusterSeats(ZONE_BOUNDS[8], 15, 5, 'RR', 1, 8);
    for (const s of rrSeats) insertSeat.run(s.seat_label, s.workstation_area_id, s.zone_id, s.has_monitor, s.x, s.y);

    const rqSeats = generateClusterSeats(ZONE_BOUNDS[9], 6, 6, 'RQ', 1, 9);
    for (const s of rqSeats) insertSeat.run(s.seat_label, s.workstation_area_id, s.zone_id, s.has_monitor, s.x, s.y);
  });

  transaction();
}
