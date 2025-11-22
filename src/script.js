// Form functionality + Leaflet map + distance calculation (Haversine)

// Shared factories list so map and routing use the same data (Alicorp facilities)
const FACTORIES = {
  sidsur_arequipa: {
    name: 'Planta Sidsur – Arequipa',
    address: 'Av. Parra 400, Arequipa',
    lat: -16.416202,
    lng: -71.548538
  },
  molino_arequipa: {
    name: 'Planta Molino Arequipa',
    address: 'Av. Los Incas 1112, Arequipa',
    lat: -16.421977,
    lng: -71.543614
  },
  predio_callao: {
    name: 'Predio Central – Callao',
    address: 'Av. Argentina 4793, Carmen de la Legua Reynoso, Callao',
    lat: -12.047316,
    lng: -77.097444
  },
  molino_callao: {
    name: 'Planta Molino Callao',
    address: 'Jr. Huáscar 143, Callao',
    lat: -12.051419,
    lng: -77.138452
  },
  intradevco_ventanilla: {
    name: 'Planta Intradevco – Ventanilla',
    address: 'Av. Revolución 780, Zona Industrial, Ventanilla',
    lat: -11.8644386,
    lng: -77.1246397
  },
  sayon_ate: {
    name: 'Planta Sayón – Ate',
    address: 'Jr. Sicaya 110, Urb. Valdiviezo, Ate, Lima',
    lat: -12.06394,
    lng: -76.9897524
  },
  nana_chaclacayo: {
    name: 'Planta Ñaña – Chaclacayo',
    address: 'Carretera Central km 18.5, Chaclacayo, Lima',
    lat: -11.9919199,
    lng: -76.825733
  },
  molino_paita: {
    name: 'Planta Molino Paita – Paita',
    address: 'Urb. Zona Industrial, Av. Industrial Mz W Lote 01, Paita, Piura',
    lat: -5.086352,
    lng: -81.097726
  },
  nicovita_moche: {
    name: 'Planta Nicovita – Moche (Trujillo)',
    address: 'Prolongación Gonzales Prada 200–202, Moche, Trujillo, La Libertad',
    lat: -8.135008,
    lng: -79.013007
  }
};

// GLORIA facilities (added to FACTORIES as well)
FACTORIES.gloria_huachipa = {
  name: 'Planta Gloria – Huachipa (Lurigancho - Chosica)',
  address: 'Av. La Capitana 190, Huachipa, Lurigancho-Chosica, Lima',
  lat: -12.005325,
  lng: -76.906271
};
FACTORIES.gloria_arequipa = {
  name: 'Planta Gloria – Arequipa (Cercado)',
  address: 'Av. General Diez Canseco 527, Arequipa',
  lat: -16.370514,
  lng: -71.560433
};
FACTORIES.gloria_majes = {
  name: 'Planta Gloria – Majes (Pampa de Siguas)',
  address: 'Zona industrial Pampa de Siguas, Majes, Arequipa',
  lat: -16.365556,
  lng: -72.162222
};
FACTORIES.gloria_lajoya = {
  name: 'Planta Gloria – La Joya',
  address: 'Distrito de La Joya, Arequipa',
  lat: -16.50638,
  lng: -71.82309
};
FACTORIES.gloria_cajamarca = {
  name: 'Planta Gloria – Cajamarca',
  address: 'Carretera El Porongo km 2, Baños del Inca, Cajamarca',
  lat: -7.166984,
  lng: -78.520431
};
FACTORIES.gloria_trujillo = {
  name: 'Planta Gloria – Trujillo (Moche)',
  address: 'Pje. Gloria, Moche, Trujillo, La Libertad',
  lat: -8.141672,
  lng: -79.016842
};

// BACKUS facilities
FACTORIES.backus_ate = {
  name: 'Planta Backus – Ate (Lima)',
  address: 'Av. Nicolás Ayllón 4050, Ate-Vitarte, Lima',
  lat: -12.0486,
  lng: -76.9407
};
FACTORIES.backus_motupe = {
  name: 'Planta Backus – Motupe (Lambayeque)',
  address: 'Av. Industrial Ricardo Bentín Mujica 1101, Motupe, Lambayeque',
  lat: -6.1394,
  lng: -79.7006
};
FACTORIES.backus_piura = {
  name: 'Planta Backus – Piura (Veintiséis de Octubre)',
  address: 'Veintiséis de Octubre, Provincia de Piura',
  lat: -5.1492,
  lng: -80.6948
};
FACTORIES.backus_arequipa = {
  name: 'Planta Backus – Arequipa',
  address: 'Planta Arequipa',
  lat: -16.39,
  lng: -71.54
};

// NESTLE facilities
FACTORIES.nestle_callao = {
  name: 'Planta Nestlé – Callao',
  address: 'Av. Elmer Faucett 3000, Callao, Lima',
  lat: -12.048812,
  lng: -77.111925
};
FACTORIES.nestle_chilca = {
  name: 'Planta Nestlé – Chilca (Cañete)',
  address: 'Panamericana Sur km 63, Chilca, Cañete, Lima',
  lat: -12.522941,
  lng: -76.738122
};
FACTORIES.nestle_cajamarca = {
  name: 'Planta Nestlé – Cajamarca',
  address: 'Zona industrial Cajamarca, Baños del Inca',
  lat: -7.150327,
  lng: -78.510214
};
FACTORIES.nestle_chiclayo = {
  name: 'Planta Nestlé – Chiclayo',
  address: 'Carretera Chiclayo – Pomalca, Lambayeque',
  lat: -6.756884,
  lng: -79.868259
};

// AJEPER facilities
FACTORIES.ajeper_huachipa = {
  name: 'Planta Huachipa',
  address: 'AJEPER Huachipa',
  lat: -12.018942,
  lng: -76.922487
};
FACTORIES.ajeper_trujillo = {
  name: 'Planta Trujillo',
  address: 'AJEPER Trujillo',
  lat: -8.090012,
  lng: -79.049731
};
FACTORIES.ajeper_monsefu = {
  name: 'Planta Monsefú',
  address: 'AJEPER Monsefú',
  lat: -6.924386,
  lng: -79.857219
};
FACTORIES.ajeper_sullana = {
  name: 'Planta Sullana',
  address: 'AJEPER Sullana',
  lat: -4.892741,
  lng: -80.676503
};
FACTORIES.ajeper_huancayo = {
  name: 'Planta Huancayo',
  address: 'AJEPER Huancayo',
  lat: -12.049063,
  lng: -75.234842
};
FACTORIES.ajeper_tarapoto = {
  name: 'Planta Tarapoto',
  address: 'AJEPER Tarapoto',
  lat: -6.482317,
  lng: -76.372409
};
FACTORIES.ajeper_pucallpa = {
  name: 'Planta Pucallpa',
  address: 'AJEPER Pucallpa',
  lat: -8.386519,
  lng: -74.555832
};
FACTORIES.ajeper_iquitos = {
  name: 'Planta Iquitos',
  address: 'AJEPER Iquitos',
  lat: -3.752984,
  lng: -73.269214
};

// SAN FERNANDO facilities
FACTORIES.sanfernando_ventanilla = {
  name: 'Planta San Fernando – Ventanilla',
  address: 'Av. Néstor Gambetta km 15.5, Ventanilla, Callao',
  lat: -11.845927,
  lng: -77.140668
};
FACTORIES.sanfernando_chancay = {
  name: 'Planta San Fernando – Chancay',
  address: 'Carretera Panamericana Norte km 80, Chancay, Huaral',
  lat: -11.534218,
  lng: -77.270951
};
FACTORIES.sanfernando_chincha = {
  name: 'Planta San Fernando – Chincha',
  address: 'Panamericana Sur km 198, Chincha Alta, Ica',
  lat: -13.409284,
  lng: -76.125842
};
FACTORIES.sanfernando_trujillo = {
  name: 'Planta San Fernando – Trujillo',
  address: 'Zona Industrial La Esperanza, Trujillo',
  lat: -8.068744,
  lng: -79.041392
};
FACTORIES.sanfernando_arequipa = {
  name: 'Planta San Fernando – Arequipa',
  address: 'Parque Industrial Río Seco, Cerro Colorado, Arequipa',
  lat: -16.336921,
  lng: -71.562774
};

// Companies grouping (each company references keys in FACTORIES)
const COMPANIES = {
  alicorp: {
    name: 'Alicorp',
    sites: [
      'sidsur_arequipa',
      'molino_arequipa',
      'predio_callao',
      'molino_callao',
      'intradevco_ventanilla',
      'sayon_ate',
      'nana_chaclacayo',
      'molino_paita',
      'nicovita_moche'
    ]
  },
  gloria: {
    name: 'Gloria',
    sites: [
      'gloria_huachipa',
      'gloria_arequipa',
      'gloria_majes',
      'gloria_lajoya',
      'gloria_cajamarca',
      'gloria_trujillo'
    ]
  },
  backus: {
    name: 'Backus',
    sites: [
      'backus_ate',
      'backus_motupe',
      'backus_piura',
      'backus_arequipa'
    ]
  },
  nestle: {
    name: 'Nestlé',
    sites: [
      'nestle_callao',
      'nestle_chilca',
      'nestle_cajamarca',
      'nestle_chiclayo'
    ]
  },
  otras: {
    name: 'Otras',
    sites: []
  }
  ,
  ajeper: {
    name: 'AJEPER',
    sites: [
      'ajeper_huachipa',
      'ajeper_trujillo',
      'ajeper_monsefu',
      'ajeper_sullana',
      'ajeper_huancayo',
      'ajeper_tarapoto',
      'ajeper_pucallpa',
      'ajeper_iquitos'
    ]
  },
  sanfernando: {
    name: 'San Fernando',
    sites: [
      'sanfernando_ventanilla',
      'sanfernando_chancay',
      'sanfernando_chincha',
      'sanfernando_trujillo',
      'sanfernando_arequipa'
    ]
  }
};


document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clearBtn");
  const calculateBtn = document.getElementById("calculateBtn");
  const originInput = document.getElementById("origin");
  const destinationInput = document.getElementById("destination");
  const distanceValue = document.getElementById("distanceValue");
  const timeValue = document.getElementById('timeValue');
  const companySelect = document.getElementById('companySelect');

  // Ordenar empresas alfabéticamente excepto 'otras' (próximamente)
  function fillCompanySelect() {
    const keys = Object.keys(COMPANIES).filter(k => k !== 'otras');
    keys.sort((a, b) => {
      const nameA = COMPANIES[a].name.toLowerCase();
      const nameB = COMPANIES[b].name.toLowerCase();
      return nameA.localeCompare(nameB);
    });
    companySelect.innerHTML = '';
    keys.forEach(k => {
      const opt = document.createElement('option');
      opt.value = k;
      opt.textContent = COMPANIES[k].name;
      companySelect.appendChild(opt);
    });
    // 'Otras' siempre al final
    if (COMPANIES.otras) {
      const opt = document.createElement('option');
      opt.value = 'otras';
      opt.textContent = COMPANIES.otras.name + ' (próximamente)';
      companySelect.appendChild(opt);
    }
  }

  fillCompanySelect();

  // Inicializar mapa centrado en Perú
  const map = L.map('map', { preferCanvas: true }).setView([-9.189967, -75.015152], 5.2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Añadir marcadores de fábricas
  const markers = {};
  Object.keys(FACTORIES).forEach((id) => {
    const f = FACTORIES[id];
    const m = L.marker([f.lat, f.lng]).addTo(map).bindPopup(f.name);
    m.on('click', () => {
      // Si no hay origin, setearlo; sino setear destination si es distinto
      if (!originInput.value) {
        originInput.value = id;
      } else if (!destinationInput.value && originInput.value !== id) {
        destinationInput.value = id;
      }
    });
    markers[id] = m;
  });

  let routeLine = null;

  // Clear button functionality
  clearBtn.addEventListener('click', () => {
    originInput.value = '';
    destinationInput.value = '';
    distanceValue.textContent = '—';
    if (routeLine) { map.removeLayer(routeLine); routeLine = null; }
    originInput.focus();
  });

  // Populate origin/destination selects based on selected company
  function populateSiteSelects(companyKey) {
    const sel = COMPANIES[companyKey] || { sites: [] };
    const sites = sel.sites;

    // helper to clear and add placeholder
    function fill(selectEl) {
      selectEl.innerHTML = '';
      const ph = document.createElement('option');
      ph.value = '';
      ph.textContent = selectEl.id === 'origin' ? 'Selecciona la primera fábrica' : 'Selecciona la fábrica donde llegar';
      selectEl.appendChild(ph);
      sites.forEach((k) => {
        if (!FACTORIES[k]) return;
        const opt = document.createElement('option');
        opt.value = k;
        opt.textContent = FACTORIES[k].name;
        selectEl.appendChild(opt);
      });
    }

    fill(originInput);
    fill(destinationInput);

    // clear any existing route if the selected origin/destination is no longer valid
    if (routeLine) { map.removeLayer(routeLine); routeLine = null; }

    // Show/hide markers according to selected company
    Object.keys(markers).forEach((k) => {
      const m = markers[k];
      if (sites.includes(k)) {
        // ensure marker is visible
        if (!map.hasLayer(m)) m.addTo(map);
      } else {
        // hide marker
        if (map.hasLayer(m)) m.remove();
      }
    });

    // Fit map to visible markers for the selected company
    const visibleKeys = Object.keys(markers).filter(k => sites.includes(k));
    if (visibleKeys.length) {
      const b = visibleKeys.reduce((bounds, k) => {
        const f = FACTORIES[k];
        return bounds.extend([f.lat, f.lng]);
      }, L.latLngBounds([]));
      try { map.fitBounds(b, { padding: [50, 50] }); } catch (e) { /* ignore */ }
    }
  }

  // When company changes, repopulate sites
  companySelect.addEventListener('change', (e) => {
    populateSiteSelects(e.target.value);
  });

  // Initialize selects with Alicorp
  populateSiteSelects('alicorp');

  // Calculate button functionality
  calculateBtn.addEventListener('click', () => {
    const origin = originInput.value;
    const destination = destinationInput.value;

    if (!origin || !destination) {
      alert('Por favor selecciona un punto de inicio y un destino');
      return;
    }

    if (origin === destination) {
      alert('El punto de inicio y destino deben ser diferentes');
      return;
    }

    const a = FACTORIES[origin];
    const b = FACTORIES[destination];

    if (!a || !b) {
      alert('Fábrica no encontrada');
      return;
    }

    // Query OSRM public routing server to get a real street route (driving)
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${a.lng},${a.lat};${b.lng},${b.lat}?overview=full&geometries=geojson&alternatives=false`;
    fetch(osrmUrl).then(res => res.json()).then((data) => {
      if (data && data.code === 'Ok' && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coords = route.geometry.coordinates.map(c => [c[1], c[0]]); // to [lat,lng]
        const distKm = route.distance / 1000;
        const durationMin = route.duration / 60;

        if (routeLine) { map.removeLayer(routeLine); }
        routeLine = L.polyline(coords, { color: '#1976d2', weight: 5, opacity: 0.95 }).addTo(map);
        map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

        distanceValue.textContent = distKm.toFixed(2) + ' km';
        timeValue.textContent = isFinite(durationMin) ? `${Math.round(durationMin)} min` : '—';

        // open popups at origin/destination
        if (markers[origin]) markers[origin].openPopup();
        if (markers[destination]) markers[destination].openPopup();

        console.log('OSRM route:', route);
        alert('Ruta óptima (vías reales) calculada: ' + a.name + ' → ' + b.name + '\nDistancia: ' + distKm.toFixed(2) + ' km\nTiempo estimado: ' + (isFinite(durationMin) ? Math.round(durationMin) + ' min' : 'N/A'));
      } else {
        // fallback to straight-line if OSRM cannot find route
        const distKm = haversine(a.lat, a.lng, b.lat, b.lng);
        if (routeLine) { map.removeLayer(routeLine); }
        routeLine = L.polyline([[a.lat, a.lng], [b.lat, b.lng]], { color: '#999', weight: 3, dashArray: '6,6', opacity: 0.8 }).addTo(map);
        map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
        distanceValue.textContent = distKm.toFixed(2) + ' km';
        timeValue.textContent = '—';
        alert('No se encontró ruta por calles via OSRM; mostrando línea directa. Distancia aprox: ' + distKm.toFixed(2) + ' km');
      }
    }).catch((err) => {
      console.error('OSRM error', err);
      const distKm = haversine(a.lat, a.lng, b.lat, b.lng);
      if (routeLine) { map.removeLayer(routeLine); }
      routeLine = L.polyline([[a.lat, a.lng], [b.lat, b.lng]], { color: '#999', weight: 3, dashArray: '6,6', opacity: 0.8 }).addTo(map);
      map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
      distanceValue.textContent = distKm.toFixed(2) + ' km';
      timeValue.textContent = '—';
      alert('Error consultando el servicio de ruteo; mostrando línea directa.');
    });
  });

  // Allow Enter key to calculate
  destinationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      calculateBtn.click();
    }
  });

  // Haversine formula (distance in km)
  function haversine(lat1, lon1, lat2, lon2) {
    function toRad(x) { return x * Math.PI / 180; }
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
});

// --- Graph & algorithms (Kosaraju, condensation, topo, Dijkstra) ---
// Sample directed, weighted graph representing main road links (approx. weights in km)
const GraphModule = (() => {
  // We'll reuse the same `factories` coordinates from above by re-parsing DOM if needed.
  function getNodes() {
    // keys from selects
    return ['lima','arequipa','trujillo','chiclayo','cusco'];
  }

  // Build a sample directed weighted adjacency list. We compute approximate road distance using haversine * factor.
  function buildSampleGraph(factories) {
    const g = new Map();
    Object.keys(factories).forEach((k) => g.set(k, []));

    // helper to add directed edge
    function add(u,v,factor=1.15) {
      const w = haversine(factories[u].lat, factories[u].lng, factories[v].lat, factories[v].lng) * factor;
      g.get(u).push({to: v, weight: w});
    }

    // Create plausible connections (directed), factors simulate road sinuosity or direction differences
    add('lima','trujillo',1.2);
    add('trujillo','lima',1.25);
    add('lima','arequipa',1.35);
    add('arequipa','cusco',1.1);
    add('cusco','lima',1.5);
    add('trujillo','chiclayo',1.05);
    add('chiclayo','lima',1.3);
    add('arequipa','lima',1.4);
    add('cusco','arequipa',1.05);

    return g;
  }

  // Kosaraju: return array of SCC arrays
  function kosaraju(graph) {
    const nodes = Array.from(graph.keys());
    const visited = new Set();
    const order = [];

    function dfs(u) {
      visited.add(u);
      for (const e of graph.get(u)) if (!visited.has(e.to)) dfs(e.to);
      order.push(u);
    }

    nodes.forEach((n) => { if (!visited.has(n)) dfs(n); });

    // Transpose
    const gt = new Map();
    nodes.forEach((n) => gt.set(n, []));
    for (const [u, edges] of graph.entries()) for (const e of edges) gt.get(e.to).push({to: u, weight: e.weight});

    const comp = new Map();
    visited.clear();
    const sccs = [];

    function dfs2(u, bucket) {
      visited.add(u);
      bucket.push(u);
      for (const e of gt.get(u)) if (!visited.has(e.to)) dfs2(e.to, bucket);
    }

    for (let i = order.length - 1; i >= 0; i--) {
      const v = order[i];
      if (!visited.has(v)) {
        const bucket = [];
        dfs2(v, bucket);
        bucket.forEach((n) => comp.set(n, sccs.length));
        sccs.push(bucket);
      }
    }

    return { sccs, comp };
  }

  // Build condensation graph (SCC graph) as adjacency list
  function buildCondensation(graph, sccInfo) {
    const { sccs, comp } = sccInfo;
    const cg = new Map();
    for (let i = 0; i < sccs.length; i++) cg.set(i, new Map());

    for (const [u, edges] of graph.entries()) {
      for (const e of edges) {
        const a = comp.get(u);
        const b = comp.get(e.to);
        if (a !== b) {
          const current = cg.get(a).get(b) ?? Infinity;
          const w = e.weight;
          if (w < current) cg.get(a).set(b, w);
        }
      }
    }

    // convert inner maps to arrays
    const out = new Map();
    for (const [k, m] of cg.entries()) out.set(k, Array.from(m.entries()).map(([to, weight]) => ({to, weight})));
    return out;
  }

  // Topological sort (Kahn) for condensation DAG
  function topoSort(cond) {
    const indeg = new Map();
    for (const k of cond.keys()) indeg.set(k, 0);
    for (const [u, edges] of cond.entries()) for (const e of edges) indeg.set(e.to, (indeg.get(e.to) || 0) + 1);

    const q = [];
    for (const [k,v] of indeg.entries()) if (v === 0) q.push(k);
    const order = [];
    while (q.length) {
      const u = q.shift();
      order.push(u);
      for (const e of cond.get(u) || []) {
        indeg.set(e.to, indeg.get(e.to) - 1);
        if (indeg.get(e.to) === 0) q.push(e.to);
      }
    }
    if (order.length !== cond.size) return null; // cycle
    return order;
  }

  // Dijkstra (returns {dist, prev} maps)
  function dijkstra(graph, src) {
    const dist = new Map();
    const prev = new Map();
    for (const n of graph.keys()) { dist.set(n, Infinity); prev.set(n, null); }
    dist.set(src, 0);
    const pq = new MinHeap((a,b) => a.priority < b.priority);
    pq.push({key: src, priority: 0});

    while (!pq.empty()) {
      const {key: u} = pq.pop();
      const du = dist.get(u);
      for (const e of graph.get(u) || []) {
        const alt = du + e.weight;
        if (alt < dist.get(e.to)) {
          dist.set(e.to, alt);
          prev.set(e.to, u);
          pq.push({key: e.to, priority: alt});
        }
      }
    }

    return { dist, prev };
  }

  // Reconstruct path from prev map
  function reconstruct(prev, target) {
    const path = [];
    let u = target;
    while (u) { path.push(u); u = prev.get(u); }
    return path.reverse();
  }

  // Simple binary min-heap for Dijkstra
  class MinHeap {
    constructor(lt) { this.arr = []; this.lt = lt || ((a,b)=>a < b); }
    push(v) { this.arr.push(v); this._siftUp(this.arr.length-1); }
    pop() { if (!this.arr.length) return null; const top = this.arr[0]; const last = this.arr.pop(); if (this.arr.length) { this.arr[0]=last; this._siftDown(0); } return top; }
    empty() { return this.arr.length===0; }
    _siftUp(i){ while(i>0){ const p=(i-1)>>1; if(this.lt(this.arr[i], this.arr[p])){ [this.arr[i],this.arr[p]]=[this.arr[p],this.arr[i]]; i=p; } else break; } }
    _siftDown(i){ const n=this.arr.length; while(true){ let l=2*i+1, r=l+1, smallest=i; if(l<n && this.lt(this.arr[l], this.arr[smallest])) smallest=l; if(r<n && this.lt(this.arr[r], this.arr[smallest])) smallest=r; if(smallest===i) break; [this.arr[i],this.arr[smallest]]=[this.arr[smallest],this.arr[i]]; i=smallest; } }
  }

  return { buildSampleGraph, kosaraju, buildCondensation, topoSort, dijkstra, reconstruct };
})();


