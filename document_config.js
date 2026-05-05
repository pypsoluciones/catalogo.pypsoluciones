/* =============================================================================
 * DOCUMENT_CONFIG.js — Sistema de Facturación P&P Soluciones
 * 
 * Contrato único entre frontend y backend para gestión de documentos.
 * Define metadata, RPCs, validaciones y permisos de cada tipo de documento.
 * 
 * USO:
 *   const cfg = DOCUMENT_CONFIG.FACTURA;
 *   const rpc = cfg.rpc_creacion;        // 'procesar_factura'
 *   const tabla = cfg.tabla_destino;     // 'ventas_facturas'
 *   if (cfg.es_fiscal) { ... }
 * 
 * HELPERS:
 *   DocumentConfigHelper.getConfigByTipo('FACTURA')
 *   DocumentConfigHelper.getRPCParaTipo('PRESUPUESTO')
 *   DocumentConfigHelper.getDocumentosFiscales()
 *   DocumentConfigHelper.puedeConvertirseA('PRESUPUESTO', 'FACTURA')
 *   DocumentConfigHelper.validarCamposObligatorios('FACTURA', payload)
 *   DocumentConfigHelper.formatearCorrelativo('FACTURA', 'IMPRENTA_DIGITAL', 12)
 * ============================================================================= */

(function (global) {
  'use strict';

  // ───────────────────────────────────────────────────────────────────────────
  // CONSTANTES DE TIPO (deben coincidir EXACTAMENTE con CHECK constraints BD)
  // ───────────────────────────────────────────────────────────────────────────
  const TIPOS = Object.freeze({
    // Documentos comerciales (no fiscales)
    PRESUPUESTO:         'PRESUPUESTO',
    PROFORMA:            'PROFORMA',
    PEDIDO:              'PEDIDO',
    NOTA_ENTREGA:        'NOTA_ENTREGA',

    // Documentos fiscales
    FACTURA:             'FACTURA',
    NOTA_CREDITO:        'NOTA_CREDITO',
    NOTA_DEBITO:         'NOTA_DEBITO',

    // Documentos de compras
    ORDEN_COMPRA:        'ORDEN_COMPRA',
    FACTURA_COMPRA:      'FACTURA_COMPRA',

    // Documentos escolares (pre-diseñados)
    RECIBO_INSCRIPCION:  'RECIBO_INSCRIPCION',
    RECIBO_MENSUALIDAD:  'RECIBO_MENSUALIDAD',
    CONSTANCIA_ESTUDIO:  'CONSTANCIA_ESTUDIO'
  });

  // ───────────────────────────────────────────────────────────────────────────
  // CONSTANTES DE MODO FISCAL (Providencia 0102)
  // ───────────────────────────────────────────────────────────────────────────
  const MODOS_FISCALES = Object.freeze({
    IMPRENTA_FISICA:     'IMPRENTA_FISICA',
    MAQUINA_FISCAL:      'MAQUINA_FISCAL',
    IMPRENTA_DIGITAL:    'IMPRENTA_DIGITAL',
    INTERNO_NO_FISCAL:   'INTERNO_NO_FISCAL'
  });

  // ───────────────────────────────────────────────────────────────────────────
  // CONFIGURACIÓN MAESTRA POR TIPO DE DOCUMENTO
  // ───────────────────────────────────────────────────────────────────────────
  const DOCUMENT_CONFIG = Object.freeze({

    // ═════════════════════════════════════════════════════════════════════════
    // PRESUPUESTO — Cotización formal con validez temporal
    // ═════════════════════════════════════════════════════════════════════════
    PRESUPUESTO: Object.freeze({
      tipo:                        TIPOS.PRESUPUESTO,
      universo:                    'COMERCIAL',
      tabla_destino:               'documentos_comerciales',
      tabla_detalles:              'documentos_comerciales_detalles',
      vista_listado:               'vista_documentos_comerciales_completa',

      rpc_creacion:                'procesar_documento_comercial',
      rpc_conversion:              'convertir_documento_a_factura',

      es_fiscal:                   false,
      mueve_stock:                 false,
      mueve_caja:                  false,
      requiere_cliente:            false,
      requiere_numero_fiscal:      false,
      permite_credito:             true,
      permite_anulacion:           true,
      es_inmutable_post_creacion:  false,

      permite_conversion_a:        ['FACTURA', 'PEDIDO', 'NOTA_ENTREGA'],
      requiere_motivo_anulacion:   false,

      etiqueta_singular:           'Presupuesto',
      etiqueta_plural:             'Presupuestos',
      icono:                       'document-text',
      color:                       '#3B82F6',
      color_hex_claro:             '#DBEAFE',
      ruta_listado:                'admin_ventas_presupuestos.html',
      ruta_creacion:               'admin_ventas.html?tipo=PRESUPUESTO',

      permisos_requeridos:         ['ventas.crear_presupuesto'],

      formato_correlativo:         'PRES-{n:6}',     // PRES-000001
      campos_obligatorios:         ['items'],
      campos_recomendados:         ['id_persona', 'fecha_vencimiento'],

      estatus_iniciales:           ['PENDIENTE'],
      estatus_finales:             ['CONVERTIDO', 'ANULADO', 'VENCIDO'],
      transiciones_validas: {
        PENDIENTE: ['APROBADO', 'ANULADO', 'VENCIDO'],
        APROBADO:  ['CONVERTIDO', 'ANULADO']
      },

      vencimiento_default_dias:    15,
      mostrar_iva:                 true,
      mostrar_igtf:                false,

      mensaje_zero_state:          'Aún no has creado presupuestos. Crea uno y conviértelo a factura cuando el cliente acepte.',
      tooltip_boton_crear:         'Cotización con validez temporal. No mueve stock ni caja.'
    }),

    // ═════════════════════════════════════════════════════════════════════════
    // PROFORMA — Pre-factura sin valor fiscal
    // ═════════════════════════════════════════════════════════════════════════
    PROFORMA: Object.freeze({
      tipo:                        TIPOS.PROFORMA,
      universo:                    'COMERCIAL',
      tabla_destino:               'documentos_comerciales',
      tabla_detalles:              'documentos_comerciales_detalles',
      vista_listado:               'vista_documentos_comerciales_completa',

      rpc_creacion:                'procesar_documento_comercial',
      rpc_conversion:              'convertir_documento_a_factura',

      es_fiscal:                   false,
      mueve_stock:                 false,
      mueve_caja:                  false,
      requiere_cliente:            true,
      requiere_numero_fiscal:      false,
      permite_credito:             true,
      permite_anulacion:           true,
      es_inmutable_post_creacion:  false,

      permite_conversion_a:        ['FACTURA'],
      requiere_motivo_anulacion:   false,

      etiqueta_singular:           'Proforma',
      etiqueta_plural:             'Proformas',
      icono:                       'document',
      color:                       '#8B5CF6',
      color_hex_claro:             '#EDE9FE',
      ruta_listado:                'admin_ventas_presupuestos.html?tipo=PROFORMA',
      ruta_creacion:               'admin_ventas.html?tipo=PROFORMA',

      permisos_requeridos:         ['ventas.crear_proforma'],

      formato_correlativo:         'PROF-{n:6}',
      campos_obligatorios:         ['id_persona', 'items'],
      campos_recomendados:         ['fecha_vencimiento'],

      estatus_iniciales:           ['PENDIENTE'],
      estatus_finales:             ['CONVERTIDO', 'ANULADO', 'VENCIDO'],
      transiciones_validas: {
        PENDIENTE: ['APROBADO', 'ANULADO', 'VENCIDO'],
        APROBADO:  ['CONVERTIDO', 'ANULADO']
      },

      vencimiento_default_dias:    30,
      mostrar_iva:                 true,
      mostrar_igtf:                false,

      mensaje_zero_state:          'Las proformas son pre-facturas formales para clientes corporativos.',
      tooltip_boton_crear:         'Pre-factura formal. Cliente obligatorio. Convertible a factura.'
    }),

    // ═════════════════════════════════════════════════════════════════════════
    // PEDIDO — Orden de compra del cliente (compromiso de venta)
    // ═════════════════════════════════════════════════════════════════════════
    PEDIDO: Object.freeze({
      tipo:                        TIPOS.PEDIDO,
      universo:                    'COMERCIAL',
      tabla_destino:               'documentos_comerciales',
      tabla_detalles:              'documentos_comerciales_detalles',
      vista_listado:               'vista_documentos_comerciales_completa',

      rpc_creacion:                'procesar_documento_comercial',
      rpc_conversion:              'convertir_documento_a_factura',

      es_fiscal:                   false,
      mueve_stock:                 false,
      mueve_caja:                  false,
      requiere_cliente:            true,
      requiere_numero_fiscal:      false,
      permite_credito:             true,
      permite_anulacion:           true,
      es_inmutable_post_creacion:  false,

      permite_conversion_a:        ['FACTURA', 'NOTA_ENTREGA'],
      requiere_motivo_anulacion:   false,

      etiqueta_singular:           'Pedido',
      etiqueta_plural:             'Pedidos',
      icono:                       'clipboard-document-list',
      color:                       '#F59E0B',
      color_hex_claro:             '#FEF3C7',
      ruta_listado:                'admin_ventas_presupuestos.html?tipo=PEDIDO',
      ruta_creacion:               'admin_ventas.html?tipo=PEDIDO',

      permisos_requeridos:         ['ventas.crear_pedido'],

      formato_correlativo:         'PED-{n:6}',
      campos_obligatorios:         ['id_persona', 'items'],
      campos_recomendados:         ['fecha_vencimiento', 'metodos_pago'],

      estatus_iniciales:           ['PENDIENTE'],
      estatus_finales:             ['CONVERTIDO', 'ANULADO', 'VENCIDO'],
      transiciones_validas: {
        PENDIENTE: ['APROBADO', 'ANULADO'],
        APROBADO:  ['CONVERTIDO', 'ANULADO']
      },

      vencimiento_default_dias:    7,
      mostrar_iva:                 true,
      mostrar_igtf:                false,

      mensaje_zero_state:          'Los pedidos formalizan compromisos de venta antes de la facturación.',
      tooltip_boton_crear:         'Compromiso de venta. Cliente obligatorio. Convertible a factura o nota de entrega.'
    }),

    // ═════════════════════════════════════════════════════════════════════════
    // NOTA_ENTREGA — Constancia de entrega física (sin facturar aún)
    // ═════════════════════════════════════════════════════════════════════════
    NOTA_ENTREGA: Object.freeze({
      tipo:                        TIPOS.NOTA_ENTREGA,
      universo:                    'COMERCIAL',
      tabla_destino:               'documentos_comerciales',
      tabla_detalles:              'documentos_comerciales_detalles',
      vista_listado:               'vista_documentos_comerciales_completa',

      rpc_creacion:                'procesar_documento_comercial',
      rpc_conversion:              'convertir_documento_a_factura',

      es_fiscal:                   false,
      mueve_stock:                 false,
      mueve_caja:                  false,
      requiere_cliente:            true,
      requiere_numero_fiscal:      false,
      permite_credito:             true,
      permite_anulacion:           true,
      es_inmutable_post_creacion:  false,

      permite_conversion_a:        ['FACTURA'],
      requiere_motivo_anulacion:   false,

      etiqueta_singular:           'Nota de Entrega',
      etiqueta_plural:             'Notas de Entrega',
      icono:                       'truck',
      color:                       '#10B981',
      color_hex_claro:             '#D1FAE5',
      ruta_listado:                'admin_ventas_notas.html?tipo=NOTA_ENTREGA',
      ruta_creacion:               'admin_ventas.html?tipo=NOTA_ENTREGA',

      permisos_requeridos:         ['ventas.crear_nota_entrega'],

      formato_correlativo:         'NE-{n:6}',
      campos_obligatorios:         ['id_persona', 'items'],
      campos_recomendados:         ['notas_internas'],

      estatus_iniciales:           ['PENDIENTE'],
      estatus_finales:             ['CONVERTIDO', 'ANULADO'],
      transiciones_validas: {
        PENDIENTE: ['APROBADO', 'ANULADO'],
        APROBADO:  ['CONVERTIDO', 'ANULADO']
      },

      vencimiento_default_dias:    null,
      mostrar_iva:                 false,
      mostrar_igtf:                false,

      mensaje_zero_state:          'Documenta entregas físicas pendientes de facturar.',
      tooltip_boton_crear:         'Documento que prueba la entrega. NO mueve stock automáticamente. Convertible a factura.'
    }),

    // ═════════════════════════════════════════════════════════════════════════
    // FACTURA — Documento fiscal de venta (regulado por SENIAT)
    // ═════════════════════════════════════════════════════════════════════════
    FACTURA: Object.freeze({
      tipo:                        TIPOS.FACTURA,
      universo:                    'FISCAL',
      tabla_destino:               'ventas_facturas',
      tabla_detalles:              'ventas_facturas_detalles',
      vista_listado:               'vista_facturas_completa',

      rpc_creacion:                'procesar_factura',
      rpc_pagar:                   'marcar_factura_pagada',
      rpc_anular:                  'anular_factura',
      rpc_devolver:                'procesar_devolucion',

      es_fiscal:                   true,
      mueve_stock:                 true,
      mueve_caja:                  true,    // si CONTADO
      requiere_cliente:            false,   // configurable: PERMITIR_VENTA_SIN_CLIENTE
      requiere_numero_fiscal:      true,
      permite_credito:             true,
      permite_anulacion:           true,
      es_inmutable_post_creacion:  true,    // SENIAT: blindaje fiscal

      permite_conversion_a:        [],      // No se convierte a nada (es el destino)
      requiere_motivo_anulacion:   true,

      etiqueta_singular:           'Factura',
      etiqueta_plural:             'Facturas',
      icono:                       'document-currency-dollar',
      color:                       '#DC2626',
      color_hex_claro:             '#FEE2E2',
      ruta_listado:                'admin_ventas_historial.html',
      ruta_creacion:               'admin_ventas.html?tipo=FACTURA',

      permisos_requeridos:         ['ventas.crear_factura'],

      formato_correlativo:         'FAC-{n:6}',
      formato_numero_fiscal_por_modo: {
        IMPRENTA_FISICA:           'libre',                  // Lo que diga el bloc
        MAQUINA_FISCAL:            '{prefijo:2}-{n:8}',      // 00-00000001
        IMPRENTA_DIGITAL:          '{prefijo:2}-{n:8}',      // 00-00000001 (Providencia 0102)
        INTERNO_NO_FISCAL:         'INT-{n:6}'
      },

      campos_obligatorios:         ['items', 'numero_factura_fiscal', 'numero_control_fiscal'],
      campos_recomendados:         ['id_persona', 'metodos_pago', 'qr_url_fiscal'],

      validaciones_extra: {
        VALIDAR_STOCK_AL_VENDER:        'config',  // lee de configuracion_sistema
        PERMITIR_VENTA_STOCK_NEGATIVO:  'config',
        PERMITIR_VENTA_SIN_CLIENTE:     'config',
        PERMITIR_FECHA_PASADA_CON_PIN:  'config',
        REQUIERE_TURNO_ABIERTO_CONTADO: true
      },

      estatus_iniciales:           ['PAGADA', 'POR_PAGAR'],
      estatus_finales:             ['PAGADA', 'ANULADA'],
      transiciones_validas: {
        POR_PAGAR: ['PARCIAL', 'PAGADA', 'ANULADA', 'VENCIDA'],
        PARCIAL:   ['PAGADA', 'ANULADA'],
        VENCIDA:   ['PAGADA', 'PARCIAL', 'ANULADA']
        // PAGADA → solo ANULADA (vía anular_factura)
        // ANULADA → estado terminal absoluto
      },

      vencimiento_default_dias:    30,
      mostrar_iva:                 true,
      mostrar_igtf:                true,

      requiere_qr_si_modo:         ['IMPRENTA_DIGITAL'],
      requiere_proveedor_ida_si_modo: ['IMPRENTA_DIGITAL'],

      mensaje_zero_state:          'Aún no has emitido facturas fiscales.',
      tooltip_boton_crear:         'Documento fiscal SENIAT. Inmutable después de emisión.'
    }),

    // ═════════════════════════════════════════════════════════════════════════
    // NOTA_CREDITO — Devolución / anulación parcial fiscal
    // ═════════════════════════════════════════════════════════════════════════
    NOTA_CREDITO: Object.freeze({
      tipo:                        TIPOS.NOTA_CREDITO,
      universo:                    'FISCAL',
      tabla_destino:               'ventas_facturas',
      tabla_detalles:              'ventas_facturas_detalles',
      vista_listado:               'vista_facturas_completa',

      rpc_creacion:                'procesar_factura',
      rpc_alternativa:             'procesar_devolucion',  // Si se quiere clonar 100%

      es_fiscal:                   true,
      mueve_stock:                 true,    // Devuelve stock al inventario
      mueve_caja:                  true,    // Egreso si era CONTADO
      requiere_cliente:            true,
      requiere_numero_fiscal:      true,
      permite_credito:             false,
      permite_anulacion:           true,
      es_inmutable_post_creacion:  true,

      permite_conversion_a:        [],
      requiere_motivo_anulacion:   true,
      requiere_factura_origen:     true,

      etiqueta_singular:           'Nota de Crédito',
      etiqueta_plural:             'Notas de Crédito',
      icono:                       'arrow-uturn-left',
      color:                       '#7C3AED',
      color_hex_claro:             '#EDE9FE',
      ruta_listado:                'admin_ventas_notas.html?tipo=NOTA_CREDITO',
      ruta_creacion:               'admin_ventas.html?tipo=NOTA_CREDITO',

      permisos_requeridos:         ['ventas.crear_nota_credito'],

      formato_correlativo:         'NC-{n:6}',
      formato_numero_fiscal_por_modo: {
        IMPRENTA_FISICA:           'libre',
        MAQUINA_FISCAL:            '{prefijo:2}-{n:8}',
        IMPRENTA_DIGITAL:          '{prefijo:2}-{n:8}',
        INTERNO_NO_FISCAL:         'INTNC-{n:6}'
      },

      campos_obligatorios:         ['items', 'id_factura_origen', 'numero_factura_fiscal', 'numero_control_fiscal'],
      campos_recomendados:         ['id_persona', 'subtipo'],

      estatus_iniciales:           ['PAGADA'],
      estatus_finales:             ['PAGADA', 'ANULADA'],
      transiciones_validas: {
        PAGADA: ['ANULADA']
      },

      mostrar_iva:                 true,
      mostrar_igtf:                true,

      mensaje_zero_state:          'Las notas de crédito formalizan devoluciones a clientes.',
      tooltip_boton_crear:         'Devolución fiscal. Requiere factura origen. Devuelve stock e ingresa egreso a caja.'
    }),

    // ═════════════════════════════════════════════════════════════════════════
    // NOTA_DEBITO — Cargo adicional posterior a la factura
    // ═════════════════════════════════════════════════════════════════════════
    NOTA_DEBITO: Object.freeze({
      tipo:                        TIPOS.NOTA_DEBITO,
      universo:                    'FISCAL',
      tabla_destino:               'ventas_facturas',
      tabla_detalles:              'ventas_facturas_detalles',
      vista_listado:               'vista_facturas_completa',

      rpc_creacion:                'procesar_factura',

      es_fiscal:                   true,
      mueve_stock:                 false,   // Solo cargo monetario
      mueve_caja:                  true,
      requiere_cliente:            true,
      requiere_numero_fiscal:      true,
      permite_credito:             true,
      permite_anulacion:           true,
      es_inmutable_post_creacion:  true,

      permite_conversion_a:        [],
      requiere_motivo_anulacion:   true,
      requiere_factura_origen:     true,

      etiqueta_singular:           'Nota de Débito',
      etiqueta_plural:             'Notas de Débito',
      icono:                       'arrow-up-circle',
      color:                       '#0891B2',
      color_hex_claro:             '#CFFAFE',
      ruta_listado:                'admin_ventas_notas.html?tipo=NOTA_DEBITO',
      ruta_creacion:               'admin_ventas.html?tipo=NOTA_DEBITO',

      permisos_requeridos:         ['ventas.crear_nota_debito'],

      formato_correlativo:         'ND-{n:6}',
      formato_numero_fiscal_por_modo: {
        IMPRENTA_FISICA:           'libre',
        MAQUINA_FISCAL:            '{prefijo:2}-{n:8}',
        IMPRENTA_DIGITAL:          '{prefijo:2}-{n:8}',
        INTERNO_NO_FISCAL:         'INTND-{n:6}'
      },

      campos_obligatorios:         ['items', 'id_factura_origen', 'id_persona', 'numero_factura_fiscal', 'numero_control_fiscal'],
      campos_recomendados:         ['subtipo'],

      estatus_iniciales:           ['PAGADA', 'POR_PAGAR'],
      estatus_finales:             ['PAGADA', 'ANULADA'],
      transiciones_validas: {
        POR_PAGAR: ['PARCIAL', 'PAGADA', 'ANULADA'],
        PARCIAL:   ['PAGADA', 'ANULADA'],
        PAGADA:    ['ANULADA']
      },

      mostrar_iva:                 true,
      mostrar_igtf:                true,

      mensaje_zero_state:          'Las notas de débito agregan cargos a facturas existentes (ej: intereses, cargos por mora).',
      tooltip_boton_crear:         'Cargo adicional fiscal. Requiere factura origen. NO afecta stock.'
    }),

    // ═════════════════════════════════════════════════════════════════════════
    // ORDEN_COMPRA — Solicitud a proveedor (compromiso de compra)
    // ═════════════════════════════════════════════════════════════════════════
    ORDEN_COMPRA: Object.freeze({
      tipo:                        TIPOS.ORDEN_COMPRA,
      universo:                    'COMPRAS',
      tabla_destino:               'compras_documentos',
      tabla_detalles:              'compras_documentos_detalles',
      vista_listado:               'vista_compras_completa',

      rpc_creacion:                'procesar_compra',

      es_fiscal:                   false,
      mueve_stock:                 false,   // Solo intención
      mueve_caja:                  false,
      requiere_cliente:            false,
      requiere_proveedor:          true,
      requiere_numero_fiscal:      false,
      permite_credito:             true,
      permite_anulacion:           true,
      es_inmutable_post_creacion:  false,

      permite_conversion_a:        ['FACTURA_COMPRA'],
      requiere_motivo_anulacion:   false,

      etiqueta_singular:           'Orden de Compra',
      etiqueta_plural:             'Órdenes de Compra',
      icono:                       'shopping-cart',
      color:                       '#0EA5E9',
      color_hex_claro:             '#E0F2FE',
      ruta_listado:                'admin_compras.html?tipo=ORDEN_COMPRA',
      ruta_creacion:               'admin_compras.html?nueva=ORDEN_COMPRA',

      permisos_requeridos:         ['compras.crear_orden'],

      formato_correlativo:         'OC-{n:6}',
      campos_obligatorios:         ['id_proveedor', 'items'],
      campos_recomendados:         ['fecha_vencimiento', 'condicion_pago'],

      estatus_iniciales:           ['PENDIENTE'],
      estatus_finales:             ['RECIBIDA', 'ANULADA'],
      transiciones_validas: {
        PENDIENTE: ['APROBADA', 'ANULADA'],
        APROBADA:  ['RECIBIDA', 'ANULADA']
      },

      vencimiento_default_dias:    15,
      mostrar_iva:                 true,
      mostrar_igtf:                false,

      mensaje_zero_state:          'Las órdenes de compra formalizan solicitudes a proveedores antes de recibir mercancía.',
      tooltip_boton_crear:         'Compromiso con proveedor. NO mueve stock. Se convierte en Factura de Compra al recibir.'
    }),

    // ═════════════════════════════════════════════════════════════════════════
    // FACTURA_COMPRA — Recepción de mercancía con factura del proveedor
    // ═════════════════════════════════════════════════════════════════════════
    FACTURA_COMPRA: Object.freeze({
      tipo:                        TIPOS.FACTURA_COMPRA,
      universo:                    'COMPRAS',
      tabla_destino:               'compras_documentos',
      tabla_detalles:              'compras_documentos_detalles',
      vista_listado:               'vista_compras_completa',

      rpc_creacion:                'procesar_compra',

      es_fiscal:                   false,   // No es fiscal NUESTRO; es del proveedor
      mueve_stock:                 true,    // Aumenta stock
      mueve_caja:                  true,    // Egreso si CONTADO
      requiere_cliente:            false,
      requiere_proveedor:          true,
      requiere_numero_fiscal:      false,   // Es del proveedor (numero_factura_proveedor)
      permite_credito:             true,
      permite_anulacion:           true,
      es_inmutable_post_creacion:  true,    // Una vez pagada o recibida

      permite_conversion_a:        [],
      requiere_motivo_anulacion:   true,

      etiqueta_singular:           'Factura de Compra',
      etiqueta_plural:             'Facturas de Compra',
      icono:                       'document-arrow-down',
      color:                       '#059669',
      color_hex_claro:             '#D1FAE5',
      ruta_listado:                'admin_compras.html?tipo=FACTURA_COMPRA',
      ruta_creacion:               'admin_compras.html?nueva=FACTURA_COMPRA',

      permisos_requeridos:         ['compras.crear_factura'],

      formato_correlativo:         'FC-{n:6}',
      campos_obligatorios:         ['id_proveedor', 'items', 'numero_factura_proveedor'],
      campos_recomendados:         ['numero_control_proveedor', 'fecha_recepcion', 'id_orden_compra_origen'],

      estatus_iniciales:           ['RECIBIDA'],
      estatus_finales:             ['PAGADA', 'ANULADA'],
      transiciones_validas: {
        RECIBIDA: ['PARCIAL', 'PAGADA', 'ANULADA'],
        PARCIAL:  ['PAGADA', 'ANULADA']
      },

      vencimiento_default_dias:    30,
      mostrar_iva:                 true,
      mostrar_igtf:                false,

      mensaje_zero_state:          'Registra las facturas que recibes de tus proveedores aquí.',
      tooltip_boton_crear:         'Factura del proveedor. Aumenta stock. Genera CxP si es a crédito.'
    }),

    // ═════════════════════════════════════════════════════════════════════════
    // RECIBO_INSCRIPCION — Pago de matrícula escolar (PRE-DISEÑADO)
    // ═════════════════════════════════════════════════════════════════════════
    RECIBO_INSCRIPCION: Object.freeze({
      tipo:                        TIPOS.RECIBO_INSCRIPCION,
      universo:                    'ESCOLAR',
      modulo:                      'CONTROL_ESCOLAR',
      activo_en_v1:                false,    // Se activa cuando se construya el módulo
      tabla_destino:               'documentos_comerciales',
      tabla_detalles:              'documentos_comerciales_detalles',
      vista_listado:               'vista_documentos_comerciales_completa',

      rpc_creacion:                'procesar_documento_comercial',

      es_fiscal:                   false,
      mueve_stock:                 false,
      mueve_caja:                  true,
      requiere_cliente:            true,
      requiere_numero_fiscal:      false,
      permite_credito:             true,
      permite_anulacion:           true,
      es_inmutable_post_creacion:  false,

      permite_conversion_a:        ['FACTURA'],
      requiere_motivo_anulacion:   true,

      etiqueta_singular:           'Recibo de Inscripción',
      etiqueta_plural:             'Recibos de Inscripción',
      icono:                       'academic-cap',
      color:                       '#7C2D12',
      color_hex_claro:             '#FED7AA',
      ruta_listado:                'admin_escolar_inscripciones.html',
      ruta_creacion:               'admin_escolar_inscripciones.html?nueva=true',

      permisos_requeridos:         ['escolar.crear_inscripcion'],

      formato_correlativo:         'INSC-{anio:4}-{n:5}',  // INSC-2026-00001
      campos_obligatorios:         ['id_persona', 'items', 'payload.id_alumno', 'payload.anio_escolar'],
      campos_recomendados:         ['payload.grado', 'payload.seccion'],

      payload_template: {
        id_alumno:        '',
        nombre_alumno:    '',
        cedula_alumno:    '',
        anio_escolar:     '',
        grado:            '',
        seccion:          '',
        modalidad:        ''
      },

      estatus_iniciales:           ['PENDIENTE', 'COBRADO'],
      estatus_finales:             ['COBRADO', 'ANULADO'],
      transiciones_validas: {
        PENDIENTE: ['COBRADO', 'ANULADO']
      },

      mostrar_iva:                 false,
      mostrar_igtf:                false
    }),

    // ═════════════════════════════════════════════════════════════════════════
    // RECIBO_MENSUALIDAD — Cuota mensual escolar (PRE-DISEÑADO)
    // ═════════════════════════════════════════════════════════════════════════
    RECIBO_MENSUALIDAD: Object.freeze({
      tipo:                        TIPOS.RECIBO_MENSUALIDAD,
      universo:                    'ESCOLAR',
      modulo:                      'CONTROL_ESCOLAR',
      activo_en_v1:                false,
      tabla_destino:               'documentos_comerciales',
      tabla_detalles:              'documentos_comerciales_detalles',
      vista_listado:               'vista_documentos_comerciales_completa',

      rpc_creacion:                'procesar_documento_comercial',

      es_fiscal:                   false,
      mueve_stock:                 false,
      mueve_caja:                  true,
      requiere_cliente:            true,
      requiere_numero_fiscal:      false,
      permite_credito:             true,
      permite_anulacion:           true,
      es_inmutable_post_creacion:  false,

      permite_conversion_a:        ['FACTURA'],
      requiere_motivo_anulacion:   true,

      etiqueta_singular:           'Recibo de Mensualidad',
      etiqueta_plural:             'Recibos de Mensualidad',
      icono:                       'calendar-days',
      color:                       '#9333EA',
      color_hex_claro:             '#F3E8FF',
      ruta_listado:                'admin_escolar_mensualidades.html',
      ruta_creacion:               'admin_escolar_mensualidades.html?nueva=true',

      permisos_requeridos:         ['escolar.crear_mensualidad'],

      formato_correlativo:         'MEN-{anio:4}{mes:2}-{n:5}',  // MEN-202605-00001
      campos_obligatorios:         ['id_persona', 'items', 'payload.id_alumno', 'payload.mes_cobrado', 'payload.anio_escolar'],

      payload_template: {
        id_alumno:        '',
        nombre_alumno:    '',
        anio_escolar:     '',
        mes_cobrado:      '',     // YYYY-MM
        recargo_mora_usd: 0,
        descuento_pronto_pago_usd: 0
      },

      estatus_iniciales:           ['PENDIENTE', 'COBRADO'],
      estatus_finales:             ['COBRADO', 'ANULADO', 'VENCIDO'],
      transiciones_validas: {
        PENDIENTE: ['COBRADO', 'ANULADO', 'VENCIDO'],
        VENCIDO:   ['COBRADO', 'ANULADO']
      },

      mostrar_iva:                 false,
      mostrar_igtf:                false,
      vencimiento_default_dias:    5
    }),

    // ═════════════════════════════════════════════════════════════════════════
    // CONSTANCIA_ESTUDIO — Documento administrativo escolar (PRE-DISEÑADO)
    // ═════════════════════════════════════════════════════════════════════════
    CONSTANCIA_ESTUDIO: Object.freeze({
      tipo:                        TIPOS.CONSTANCIA_ESTUDIO,
      universo:                    'ESCOLAR',
      modulo:                      'CONTROL_ESCOLAR',
      activo_en_v1:                false,
      tabla_destino:               'documentos_comerciales',
      tabla_detalles:              'documentos_comerciales_detalles',
      vista_listado:               'vista_documentos_comerciales_completa',

      rpc_creacion:                'procesar_documento_comercial',

      es_fiscal:                   false,
      mueve_stock:                 false,
      mueve_caja:                  false,
      requiere_cliente:            true,
      requiere_numero_fiscal:      false,
      permite_credito:             false,
      permite_anulacion:           true,
      es_inmutable_post_creacion:  false,

      permite_conversion_a:        [],
      requiere_motivo_anulacion:   false,

      etiqueta_singular:           'Constancia de Estudio',
      etiqueta_plural:             'Constancias de Estudio',
      icono:                       'document-check',
      color:                       '#0F766E',
      color_hex_claro:             '#CCFBF1',
      ruta_listado:                'admin_escolar_constancias.html',
      ruta_creacion:               'admin_escolar_constancias.html?nueva=true',

      permisos_requeridos:         ['escolar.crear_constancia'],

      formato_correlativo:         'CONST-{anio:4}-{n:5}',
      campos_obligatorios:         ['id_persona', 'payload.id_alumno', 'payload.tipo_constancia'],

      payload_template: {
        id_alumno:        '',
        nombre_alumno:    '',
        cedula_alumno:    '',
        tipo_constancia:  '',     // ESTUDIO, BUENA_CONDUCTA, NOTAS
        anio_escolar:     '',
        firma_director:   ''
      },

      estatus_iniciales:           ['PENDIENTE', 'APROBADO'],
      estatus_finales:             ['APROBADO', 'ANULADO'],
      transiciones_validas: {
        PENDIENTE: ['APROBADO', 'ANULADO']
      },

      mostrar_iva:                 false,
      mostrar_igtf:                false
    })
  });

  // ───────────────────────────────────────────────────────────────────────────
  // HELPERS
  // ───────────────────────────────────────────────────────────────────────────
  const DocumentConfigHelper = Object.freeze({

    /**
     * Devuelve la configuración completa para un tipo de documento.
     * @param {string} tipo - Ej: 'FACTURA', 'PRESUPUESTO'
     * @returns {object|null}
     */
    getConfigByTipo(tipo) {
      if (!tipo || typeof tipo !== 'string') return null;
      const tipoNormalizado = tipo.toUpperCase().trim();
      return DOCUMENT_CONFIG[tipoNormalizado] || null;
    },

    /**
     * Devuelve el nombre de la RPC del backend para crear un documento del tipo dado.
     * @param {string} tipo
     * @returns {string|null}
     */
    getRPCParaTipo(tipo) {
      const cfg = this.getConfigByTipo(tipo);
      return cfg ? cfg.rpc_creacion : null;
    },

    /**
     * Devuelve la lista de tipos fiscales (universo === 'FISCAL').
     * @returns {string[]}
     */
    getDocumentosFiscales() {
      return Object.keys(DOCUMENT_CONFIG)
        .filter(k => DOCUMENT_CONFIG[k].universo === 'FISCAL');
    },

    /**
     * Devuelve la lista de tipos comerciales no-fiscales.
     * @returns {string[]}
     */
    getDocumentosComerciales() {
      return Object.keys(DOCUMENT_CONFIG)
        .filter(k => DOCUMENT_CONFIG[k].universo === 'COMERCIAL');
    },

    /**
     * Devuelve la lista de tipos de compras.
     * @returns {string[]}
     */
    getDocumentosCompras() {
      return Object.keys(DOCUMENT_CONFIG)
        .filter(k => DOCUMENT_CONFIG[k].universo === 'COMPRAS');
    },

    /**
     * Devuelve la lista de tipos escolares (filtrable por activo_en_v1).
     * @param {boolean} soloActivos
     * @returns {string[]}
     */
    getDocumentosEscolares(soloActivos = false) {
      return Object.keys(DOCUMENT_CONFIG)
        .filter(k => DOCUMENT_CONFIG[k].universo === 'ESCOLAR')
        .filter(k => soloActivos ? DOCUMENT_CONFIG[k].activo_en_v1 === true : true);
    },

    /**
     * Verifica si un documento de tipoOrigen puede convertirse a tipoDestino.
     * @param {string} tipoOrigen
     * @param {string} tipoDestino
     * @returns {boolean}
     */
    puedeConvertirseA(tipoOrigen, tipoDestino) {
      const cfg = this.getConfigByTipo(tipoOrigen);
      if (!cfg) return false;
      const destino = (tipoDestino || '').toUpperCase().trim();
      return Array.isArray(cfg.permite_conversion_a) 
        && cfg.permite_conversion_a.includes(destino);
    },

    /**
     * Valida que el payload contenga todos los campos obligatorios para el tipo.
     * Soporta paths anidados como 'payload.id_alumno' usando notación de punto.
     * @param {string} tipo
     * @param {object} payload
     * @returns {{ok: boolean, faltantes: string[], mensaje: string}}
     */
    validarCamposObligatorios(tipo, payload) {
      const cfg = this.getConfigByTipo(tipo);
      if (!cfg) {
        return { ok: false, faltantes: [], mensaje: `Tipo "${tipo}" no existe en DOCUMENT_CONFIG` };
      }

      const faltantes = [];
      const obligatorios = cfg.campos_obligatorios || [];

      for (const campo of obligatorios) {
        const valor = this._getNestedValue(payload, campo);
        const esVacio = (
          valor === undefined ||
          valor === null ||
          valor === '' ||
          (Array.isArray(valor) && valor.length === 0) ||
          (typeof valor === 'object' && !Array.isArray(valor) && Object.keys(valor).length === 0)
        );
        if (esVacio) faltantes.push(campo);
      }

      return {
        ok: faltantes.length === 0,
        faltantes,
        mensaje: faltantes.length === 0
          ? 'Validación OK'
          : `Faltan campos obligatorios: ${faltantes.join(', ')}`
      };
    },

    /**
     * Formatea un correlativo según el patrón del tipo y opcionalmente el modo fiscal.
     * Tokens soportados: {n:N} = número con N dígitos, {prefijo:N} = prefijo IDA con N dígitos,
     *                    {anio:4}, {mes:2} = año/mes actual.
     * 
     * @param {string} tipo - Ej: 'FACTURA'
     * @param {string|null} modoFiscal - Ej: 'IMPRENTA_DIGITAL' (solo para fiscales)
     * @param {number} numero - Correlativo numérico
     * @param {string} prefijoIda - Prefijo del IDA (2 dígitos), si aplica
     * @returns {string}
     */
    formatearCorrelativo(tipo, modoFiscal, numero, prefijoIda = '00') {
      const cfg = this.getConfigByTipo(tipo);
      if (!cfg) return String(numero || '');

      let plantilla;
      if (cfg.formato_numero_fiscal_por_modo && modoFiscal && cfg.formato_numero_fiscal_por_modo[modoFiscal]) {
        plantilla = cfg.formato_numero_fiscal_por_modo[modoFiscal];
        if (plantilla === 'libre') return String(numero || '');
      } else {
        plantilla = cfg.formato_correlativo;
      }

      if (!plantilla) return String(numero || '');

      const ahora = new Date();
      const anio = String(ahora.getFullYear());
      const mes = String(ahora.getMonth() + 1).padStart(2, '0');

      return plantilla
        .replace(/\{n:(\d+)\}/g, (_, digitos) => String(numero).padStart(parseInt(digitos, 10), '0'))
        .replace(/\{prefijo:(\d+)\}/g, (_, digitos) => String(prefijoIda).padStart(parseInt(digitos, 10), '0'))
        .replace(/\{anio:(\d+)\}/g, (_, digitos) => anio.slice(-parseInt(digitos, 10)).padStart(parseInt(digitos, 10), '0'))
        .replace(/\{mes:2\}/g, mes);
    },

    /**
     * Verifica si una transición de estatus es válida según el config.
     * @param {string} tipo
     * @param {string} estatusActual
     * @param {string} estatusNuevo
     * @returns {boolean}
     */
    esTransicionValida(tipo, estatusActual, estatusNuevo) {
      const cfg = this.getConfigByTipo(tipo);
      if (!cfg || !cfg.transiciones_validas) return false;
      const desde = (estatusActual || '').toUpperCase().trim();
      const hasta = (estatusNuevo || '').toUpperCase().trim();
      const permitidos = cfg.transiciones_validas[desde];
      return Array.isArray(permitidos) && permitidos.includes(hasta);
    },

    /**
     * Obtiene un valor anidado de un objeto usando notación 'a.b.c'.
     * @private
     */
    _getNestedValue(obj, path) {
      if (!obj || !path) return undefined;
      return path.split('.').reduce((acc, key) => 
        (acc !== null && acc !== undefined) ? acc[key] : undefined, obj);
    },

    /**
     * Lista todos los tipos de documentos disponibles, opcionalmente filtrados.
     * @param {object} filtro - Ej: {universo: 'FISCAL', activo_en_v1: true}
     * @returns {object[]} Array de objetos {tipo, etiqueta, ...}
     */
    listarTipos(filtro = {}) {
      return Object.keys(DOCUMENT_CONFIG)
        .filter(k => {
          for (const [campo, valor] of Object.entries(filtro)) {
            if (DOCUMENT_CONFIG[k][campo] !== valor) return false;
          }
          return true;
        })
        .map(k => ({
          tipo:              k,
          universo:          DOCUMENT_CONFIG[k].universo,
          etiqueta_singular: DOCUMENT_CONFIG[k].etiqueta_singular,
          etiqueta_plural:   DOCUMENT_CONFIG[k].etiqueta_plural,
          icono:             DOCUMENT_CONFIG[k].icono,
          color:             DOCUMENT_CONFIG[k].color,
          ruta_listado:      DOCUMENT_CONFIG[k].ruta_listado,
          ruta_creacion:     DOCUMENT_CONFIG[k].ruta_creacion
        }));
    }
  });

  // ───────────────────────────────────────────────────────────────────────────
  // EXPORTACIÓN AL OBJETO GLOBAL (window)
  // ───────────────────────────────────────────────────────────────────────────
  global.DOCUMENT_CONFIG = DOCUMENT_CONFIG;
  global.DOCUMENT_TYPES = TIPOS;
  global.MODOS_FISCALES = MODOS_FISCALES;
  global.DocumentConfigHelper = DocumentConfigHelper;

  // Mensaje de carga (visible solo en DevTools, útil para debugging)
  if (typeof console !== 'undefined' && console.info) {
    console.info('[DOCUMENT_CONFIG] Cargado v1.0 — %d tipos disponibles', 
      Object.keys(DOCUMENT_CONFIG).length);
  }

})(typeof window !== 'undefined' ? window : globalThis);
