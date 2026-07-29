export async function fetchSeatsAvailability(date) {
  const res = await fetch(`/api/seats/availability?date=${date}`);
  if (!res.ok) throw new Error('Failed to fetch seats');
  return res.json();
}

export async function createBooking({ seat_id, booked_by, booking_date, notes }) {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ seat_id, booked_by, booking_date, notes }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Booking failed');
  }
  return res.json();
}

export async function cancelBooking(bookingId) {
  const res = await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Cancel failed');
  return res.json();
}

export async function fetchUserBookings(userName) {
  const res = await fetch(`/api/bookings?user=${encodeURIComponent(userName)}`);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}

export async function fetchAdminStats(date) {
  const res = await fetch(`/api/admin/stats?date=${date}`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchAdminBookings(date) {
  const res = await fetch(`/api/admin/bookings?date=${date}`);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}
