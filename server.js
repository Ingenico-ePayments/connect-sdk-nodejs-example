/*
 * This file was auto-generated from the API references found at
 * https://epayments-api.developer-ingenico.com/s2sapi/v1/
 */

var express = require('express');
var app = express();
var marko = require('marko');
require('marko/node-require').install();
var connectSdk = require('connect-sdk-nodejs');

var logger = require('./util/logger');

// stubs
var createHostedCheckoutStub = require('./stubs/hostedcheckouts/create.json');
var createHostedMandateManagementStub = require('./stubs/hostedmandatemanagements/create.json');
var createPaymentStub = require('./stubs/payments/create.json');
var completePaymentStub = require('./stubs/payments/complete.json');
var tokenizePaymentStub = require('./stubs/payments/tokenize.json');
var approvePaymentStub = require('./stubs/payments/approve.json');
var capturePaymentStub = require('./stubs/payments/capture.json');
var refundPaymentStub = require('./stubs/payments/refund.json');
var createPaymentDisputeStub = require('./stubs/payments/dispute.json');
var approveRefundStub = require('./stubs/refunds/approve.json');
var createPayoutStub = require('./stubs/payouts/create.json');
var approvePayoutStub = require('./stubs/payouts/approve.json');
var getDeviceFingerprintForGroupsStub = require('./stubs/productgroups/deviceFingerprint.json');
var getCustomerDetailsStub = require('./stubs/products/customerDetails.json');
var getDeviceFingerprintStub = require('./stubs/products/deviceFingerprint.json');
var riskAssessmentBankAccountStub = require('./stubs/riskassessments/bankaccounts.json');
var riskAssessmentCardsStub = require('./stubs/riskassessments/cards.json');
var convertBankAccountStub = require('./stubs/services/bankaccount.json');
var iinDetailsStub = require('./stubs/services/getIINdetails.json');
var createTokenStub = require('./stubs/tokens/create.json');
var updateTokenStub = require('./stubs/tokens/update.json');
var approveSepaDirectDebitTokenStub = require('./stubs/tokens/approvesepadirectdebit.json');
var createMandateStub = require('./stubs/mandates/create.json');
var createMandateWithReferenceStub = require('./stubs/mandates/createWithMandateReference.json');
var createSessionStub = require('./stubs/sessions/create.json');

var config = require('./config.json');

connectSdk.init({
  host: config.apiEndpoint.host,
  scheme: config.apiEndpoint.scheme,
  port: config.apiEndpoint.port,
  enableLogging: config.enableLogging, // defaults to false
  logger: logger, // if undefined console.log will be used
  apiKeyId: config.apiKeyId,
  secretApiKey: config.secretApiKey
  /*
  ,integrator: 'Ingenico.Integrator'
  ,shoppingCartExtension: {
    creator: 'Ingenico.Creator',
    name: 'Extension',
    version: '1.0',
    extensionId: 'ExtensionId'
  }
  */
});

// DEMO app
var port = config.port;
var merchantId = config.merchantId;

app.engine('marko', function (filePath, options, callback) {
  marko.load(filePath).render(options, function (err, output) {
    callback(null, output);
  });
});
app.use('/global', express.static(__dirname + '/global'));
app.set('view engine', 'marko');

app.get('/', function (req, res) {
  res.render('index');
});
var render = function (res, error, response) {
  if (error) {
    console.log(error, error.body);
    var status = (typeof error.status !== 'undefined') ? error.status : 500;
    var body = (typeof error.body !== 'undefined') ? error.body : error;
    res.status(status).json(body).end();
  } else {
    res.status(response.status).json(response.body).end();
  }
  if (connectSdk.context.getIdempotenceRequestTimestamp()) {
    // this call is made with idempotence annd is still being handled
    console.log('idempotence timestamp', connectSdk.context.getIdempotenceRequestTimestamp());
  }
};

// all SDK methods; grouped by API method

// Hosted Checkouts
app.get('/hostedcheckouts/create', function (req, res) {
  connectSdk.hostedcheckouts.create(merchantId, createHostedCheckoutStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/hostedcheckouts/get/:hostedCheckoutId', function (req, res) {
  connectSdk.hostedcheckouts.get(merchantId, req.params.hostedCheckoutId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// Hosted Mandate Management
app.get('/hostedmandatemanagements/create', function (req, res) {
  connectSdk.hostedmandatemanagements.create(merchantId, createHostedMandateManagementStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/hostedmandatemanagements/get/:hostedMandateManagementId', function (req, res) {
  connectSdk.hostedmandatemanagements.get(merchantId, req.params.hostedMandateManagementId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// Payments
app.get('/payments/create', function (req, res) {
  var paymentContext = {}
  paymentContext.idemPotence = {
    key: 'idempotence'
  };

  connectSdk.payments.create(merchantId, createPaymentStub, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/find', function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: 'X-GCS-ClientMetaInfo', value: clientUserAgent }
  ];

  connectSdk.payments.find(merchantId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/get/:paymentId', function (req, res) {
  connectSdk.payments.get(merchantId, req.params.paymentId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/complete/:paymentId', function (req, res) {
  connectSdk.payments.complete(merchantId, req.params.paymentId, completePaymentStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/thirdPartyStatus/:paymentId', function (req, res) {
  connectSdk.payments.thirdPartyStatus(merchantId, req.params.paymentId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/tokenize/:paymentId', function (req, res) {
  connectSdk.payments.tokenize(merchantId, req.params.paymentId, tokenizePaymentStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/processchallenged/:paymentId', function (req, res) {
  connectSdk.payments.processchallenged(merchantId, req.params.paymentId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/approve/:paymentId', function (req, res) {
  connectSdk.payments.approve(merchantId, req.params.paymentId, approvePaymentStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/capture/:paymentId', function (req, res) {
  connectSdk.payments.capture(merchantId, req.params.paymentId, capturePaymentStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/cancelapproval/:paymentId', function (req, res) {
  connectSdk.payments.cancelapproval(merchantId, req.params.paymentId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/captures/:paymentId', function (req, res) {
  connectSdk.payments.captures(merchantId, req.params.paymentId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/refund/:paymentId', function (req, res) {
  var paymentContext = {}
  paymentContext.idemPotence = {
    key: 'idempotence'
  };

  connectSdk.payments.refund(merchantId, req.params.paymentId, refundPaymentStub, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/refunds/:paymentId', function (req, res) {
  connectSdk.payments.refunds(merchantId, req.params.paymentId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/cancel/:paymentId', function (req, res) {
  connectSdk.payments.cancel(merchantId, req.params.paymentId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/dispute/:paymentId', function (req, res) {
  connectSdk.payments.dispute(merchantId, req.params.paymentId, createPaymentDisputeStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payments/disputes/:paymentId', function (req, res) {
  connectSdk.payments.disputes(merchantId, req.params.paymentId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// Captures
app.get('/captures/get/:captureId', function (req, res) {
  connectSdk.captures.get(merchantId, req.params.captureId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// Refunds
app.get('/refunds/find', function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: 'X-GCS-ClientMetaInfo', value: clientUserAgent }
  ];

  connectSdk.refunds.find(merchantId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/refunds/get/:refundId', function (req, res) {
  connectSdk.refunds.get(merchantId, req.params.refundId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/refunds/approve/:refundId', function (req, res) {
  connectSdk.refunds.approve(merchantId, req.params.refundId, approveRefundStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/refunds/cancel/:refundId', function (req, res) {
  connectSdk.refunds.cancel(merchantId, req.params.refundId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/refunds/cancelapproval/:refundId', function (req, res) {
  connectSdk.refunds.cancelapproval(merchantId, req.params.refundId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// Disputes
app.get('/disputes/get/:disputeId', function (req, res) {
  connectSdk.disputes.get(merchantId, req.params.disputeId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/disputes/submit/:disputeId', function (req, res) {
  connectSdk.disputes.submit(merchantId, req.params.disputeId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/disputes/cancel/:disputeId', function (req, res) {
  connectSdk.disputes.cancel(merchantId, req.params.disputeId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// Payouts
app.get('/payouts/create', function (req, res) {
  var paymentContext = {}
  paymentContext.idemPotence = {
    key: 'idempotence'
  };

  connectSdk.payouts.create(merchantId, createPayoutStub, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payouts/find', function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: 'X-GCS-ClientMetaInfo', value: clientUserAgent }
  ];

  connectSdk.payouts.find(merchantId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payouts/get/:payoutId', function (req, res) {
  connectSdk.payouts.get(merchantId, req.params.payoutId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payouts/approve/:payoutId', function (req, res) {
  connectSdk.payouts.approve(merchantId, req.params.payoutId, approvePayoutStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payouts/cancel/:payoutId', function (req, res) {
  connectSdk.payouts.cancel(merchantId, req.params.payoutId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/payouts/cancelapproval/:payoutId', function (req, res) {
  connectSdk.payouts.cancelapproval(merchantId, req.params.payoutId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// Product Groups
app.get('/productgroups/find', function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: 'X-GCS-ClientMetaInfo', value: clientUserAgent }
  ];

  connectSdk.productgroups.find(merchantId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/productgroups/get/:paymentProductGroupId', function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: 'X-GCS-ClientMetaInfo', value: clientUserAgent }
  ];

  connectSdk.productgroups.get(merchantId, req.params.paymentProductGroupId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/productgroups/deviceFingerprint/:paymentProductGroupId', function (req, res) {
  connectSdk.productgroups.deviceFingerprint(merchantId, req.params.paymentProductGroupId, getDeviceFingerprintForGroupsStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// Products
app.get('/products/find', function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: 'X-GCS-ClientMetaInfo', value: clientUserAgent }
  ];

  connectSdk.products.find(merchantId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/products/get/:paymentProductId', function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: 'X-GCS-ClientMetaInfo', value: clientUserAgent }
  ];

  connectSdk.products.get(merchantId, req.params.paymentProductId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/products/directory/:paymentProductId', function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: 'X-GCS-ClientMetaInfo', value: clientUserAgent }
  ];

  connectSdk.products.directory(merchantId, req.params.paymentProductId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/products/customerDetails/:paymentProductId/:fiscalNumber', function (req, res) {
  getCustomerDetailsStub.values[0].value = req.params.fiscalNumber;
  connectSdk.products.customerDetails(merchantId, req.params.paymentProductId, getCustomerDetailsStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/products/deviceFingerprint/:paymentProductId', function (req, res) {
  connectSdk.products.deviceFingerprint(merchantId, req.params.paymentProductId, getDeviceFingerprintStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/products/networks/:paymentProductId', function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: 'X-GCS-ClientMetaInfo', value: clientUserAgent }
  ];

  connectSdk.products.networks(merchantId, req.params.paymentProductId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/products/publicKey/:paymentProductId', function (req, res) {
  connectSdk.products.publicKey(merchantId, req.params.paymentProductId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// Risk assessments
app.get('/riskassessments/bankaccounts', function (req, res) {
  connectSdk.riskassessments.bankaccounts(merchantId, riskAssessmentBankAccountStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/riskassessments/cards', function (req, res) {
  connectSdk.riskassessments.cards(merchantId, riskAssessmentCardsStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// Services
app.get('/services/convertAmount', function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: 'X-GCS-ClientMetaInfo', value: clientUserAgent }
  ];

  connectSdk.services.convertAmount(merchantId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/services/bankaccount', function (req, res) {
  connectSdk.services.bankaccount(merchantId, convertBankAccountStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/services/getIINdetails', function (req, res) {
  connectSdk.services.getIINdetails(merchantId, iinDetailsStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/services/privacypolicy', function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: 'X-GCS-ClientMetaInfo', value: clientUserAgent }
  ];

  connectSdk.services.privacypolicy(merchantId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/services/testconnection', function (req, res) {
  connectSdk.services.testconnection(merchantId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// Tokens
app.get('/tokens/create', function (req, res) {
  connectSdk.tokens.create(merchantId, createTokenStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/tokens/get/:tokenId', function (req, res) {
  connectSdk.tokens.get(merchantId, req.params.tokenId, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/tokens/update/:tokenId', function (req, res) {
  connectSdk.tokens.update(merchantId, req.params.tokenId, updateTokenStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/tokens/delete/:tokenId', function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: 'X-GCS-ClientMetaInfo', value: clientUserAgent }
  ];

  connectSdk.tokens.remove(merchantId, req.params.tokenId, paymentContext, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/tokens/approvesepadirectdebit/:tokenId', function (req, res) {
  connectSdk.tokens.approvesepadirectdebit(merchantId, req.params.tokenId, approveSepaDirectDebitTokenStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// Mandates
app.get('/mandates/create', function (req, res) {
  connectSdk.mandates.create(merchantId, createMandateStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/mandates/createWithMandateReference/:uniqueMandateReference', function (req, res) {
  connectSdk.mandates.createWithMandateReference(merchantId, req.params.uniqueMandateReference, createMandateWithReferenceStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/mandates/get/:uniqueMandateReference', function (req, res) {
  connectSdk.mandates.get(merchantId, req.params.uniqueMandateReference, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/mandates/block/:uniqueMandateReference', function (req, res) {
  connectSdk.mandates.block(merchantId, req.params.uniqueMandateReference, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/mandates/unblock/:uniqueMandateReference', function (req, res) {
  connectSdk.mandates.unblock(merchantId, req.params.uniqueMandateReference, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});
app.get('/mandates/revoke/:uniqueMandateReference', function (req, res) {
  connectSdk.mandates.revoke(merchantId, req.params.uniqueMandateReference, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// Sessions
app.get('/sessions/create', function (req, res) {
  connectSdk.sessions.create(merchantId, createSessionStub, null, function (error, sdkResponse) {
    render(res, error, sdkResponse);
  });
});

// init express
app.listen(port, function () {
  logger.info('server running at http://localhost:' + port);
});
